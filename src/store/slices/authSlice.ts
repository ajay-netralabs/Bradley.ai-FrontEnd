import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { emissioncheckiqLogin, emissioncheckiqLogout, emissioncheckiqSessionCheck, emissioncheckiqBootstrap } from '../../Demo/components/Auth';

export type ProductKey = "bradley" | "emissioncheckiq" | string;

export interface User {
  role: 'client' | 'analyst' | 'demo' | string;
  email: string;
  product: ProductKey;
}

interface AuthState {
  user: User | null;
  bootstrap: any | null;
  authReady: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const getInitialUser = (): User | null => {
  try {
      // Check for globally persisted user (from AppProvider)
      const savedUser = localStorage.getItem('global_user');
      if (savedUser) {
          return JSON.parse(savedUser);
      }
      // Fallback or other keys if needed
  } catch (e) {
      console.error("Failed to load user from local storage", e);
  }
  return null; 
};

const initialState: AuthState = {
  user: getInitialUser(),
  bootstrap: null,
  authReady: false,
  status: 'idle',
  error: null,
};

// Async Thunks
export const checkSession = createAsyncThunk(
  'auth/checkSession',
  async (_product: ProductKey | undefined, { rejectWithValue }) => {
    // Logic adapted from AppContext sessionCheckForProduct & useEffect
    try {
        // Prioritize emissioncheckiq check as in the original useEffect
        const sessionUser = await emissioncheckiqSessionCheck();
        if (sessionUser) {
             const bootstrapData = await emissioncheckiqBootstrap();
             return {
                 user: {
                     email: sessionUser.email,
                     role: sessionUser.role || "demo",
                     product: "emissioncheckiq"
                 } as User,
                 bootstrap: bootstrapData
             };
        }
        
        // For 'bradley' user, we trust the localStorage (loaded in getInitialUser) 
        // unless we want to implement a real session check endpoint for it.
        // For now, returning null here allows the extraReducer to handle the state logic.
        return null;
    } catch (error) {
        return rejectWithValue("Session check failed");
    }
  }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ product, email, password }: { product: ProductKey, email: string, password: string }, { rejectWithValue }) => {
        try {
            if (product === "bradley") {
                // Hardcoded credentials from AppContext
                 if (email === 'client@gmail.com' && password === 'client@gmail.com') {
                    return {
                        user: { email, role: "client", product: "bradley" } as User,
                        bootstrap: null
                    };
                 }
                 throw new Error("Invalid email or password");
            } else if (product === "emissioncheckiq") {
                const sessionUser = await emissioncheckiqLogin(email, password);
                const bootstrapData = await emissioncheckiqBootstrap();
                return {
                    user: { email: sessionUser.email, role: sessionUser.role || "demo", product: "emissioncheckiq" } as User,
                    bootstrap: bootstrapData
                };
            }
            throw new Error(`Unsupported product: ${product}`);
        } catch (err: any) {
            return rejectWithValue(err.message || "Login failed");
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (product: ProductKey, { dispatch: _dispatch }) => {
        if (product === "emissioncheckiq") {
            await emissioncheckiqLogout();
        }
        // Cleanup local storage is handled in reducers
        return product;
    }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setBootstrap: (state, action: PayloadAction<any | null>) => {
        state.bootstrap = action.payload;
    },
    setAuthReady: (state, action: PayloadAction<boolean>) => {
        state.authReady = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authReady = true;
        if (action.payload) {
            // Found a session (emissioncheckiq)
            state.user = action.payload.user;
            state.bootstrap = action.payload.bootstrap;
        } else {
            // No session found via API.
            // If we have a 'bradley' user in state (from localStorage), keep it.
            // If we had an 'emissioncheckiq' user but session check failed/returned null, we should log out.
             if (state.user?.product === 'emissioncheckiq') {
                 state.user = null;
                 state.bootstrap = null;
             }
             // For 'bradley', we assume localStorage validity for now since it's a mock login.
        }
      })
      .addCase(checkSession.rejected, (state) => {
        state.status = 'failed';
        state.authReady = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.bootstrap = action.payload.bootstrap;
          state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.bootstrap = null;
      });
  },
});

export const { setUser, setBootstrap, setAuthReady } = authSlice.actions;
export default authSlice.reducer;