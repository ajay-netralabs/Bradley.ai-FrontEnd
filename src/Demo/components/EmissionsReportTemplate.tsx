import /* React, */ { forwardRef } from 'react';
import { Box, Typography, Grid, Divider, /* List, ListItem, ListItemText */ } from '@mui/material';
import { DashboardDataObject } from '../../Demo/Context/DashboardDataContext'

interface EmissionsReportTemplateProps {
    data: DashboardDataObject[] | null;
}

const formatValue = (value?: number | string | null, type: 'number' | 'currency' | 'percent' = 'number'): string => {
    if (value === null || value === undefined || value === "") return 'N/A';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'N/A';
    const options: Intl.NumberFormatOptions = { maximumFractionDigits: 2 };
    if (type === 'currency') { options.style = 'currency'; options.currency = 'USD'; options.minimumFractionDigits = 0; }
    if (type === 'percent') { return `${num.toFixed(1)}%`; }
    return new Intl.NumberFormat('en-US', options).format(num);
};

const EmissionsReportTemplate = forwardRef<HTMLDivElement, EmissionsReportTemplateProps>(({ data }, ref) => {
    if (!data || data.length === 0) return <div ref={ref}>No Data Available</div>;

    const currentYear = new Date().getFullYear();

    return (
        <div ref={ref} style={{ width: '800px', backgroundColor: '#fff', color: '#000', fontFamily: 'Nunito Sans, sans-serif' }}>
            {data.map((locationData, index) => {
                const metrics = locationData.evidence?.metrics;
                const verdict = locationData.verdict;
                const action = locationData.action_center?.recommended_solution;
                // const recMix = locationData.der_control_panel?.recommended_mix_pct;

                return (
                    <Box 
                        key={index} 
                        sx={{ 
                            padding: '20px',
                            pageBreakAfter: 'always', 
                            breakAfter: 'page',
                            breakInside: 'avoid',
                            // height: '1120px',
                            position: 'relative',
                            minHeight: 'auto',
                        }}
                    >
                        {/* --- HEADER --- */}
                        <Box sx={{ borderBottom: '2px solid #2c3e50', pb: 2, mb: 3 }}>
                            <Grid container alignItems="flex-end">
                                <Grid item xs={8}>
                                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#2c3e50', letterSpacing: '0.05em' }}>
                                        EMISSIONS & COMPLIANCE <br /> PERFORMANCE SUMMARY
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold', color: '#555' }}>
                                        {locationData.location}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                    <Typography variant="caption" display="block" sx={{ color: '#777' }}>
                                        Reporting Period
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        January – December {currentYear}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* --- 1. EXECUTIVE SUMMARY --- */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#036cc1', fontSize: '1rem', mb: 1 }}>
                                1. Executive Summary
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 2, lineHeight: 1.4 }}>
                                This report, generated using the EmissionCheckIQ+ platform, evaluates the Scope 2 greenhouse gas (GHG) emissions performance for <strong>{locationData.location}</strong>. It provides current emissions status, projected year-end performance, and compliance positioning relative to applicable building performance standards.
                            </Typography>

                            <Grid container spacing={2}>
                                {/* KPI Left Column */}
                                <Grid item xs={6}>
                                    <Box sx={{ bgcolor: '#f8f9fa', p: 1.5, borderRadius: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem', mb: 1 }}>Key Performance Indicators</Typography>
                                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.75rem', lineHeight: '1.6' }}>
                                            <li><strong>Year-to-Date Emissions:</strong> {formatValue(metrics?.actual_emissions)} MT CO₂e</li>
                                            <li><strong>Forecasted Year-End:</strong> {formatValue(metrics?.full_year_projection)} MT CO₂e</li>
                                            <li><strong>Compliance Threshold:</strong> {formatValue(metrics?.compliance_target)} MT CO₂e</li>
                                            <li><strong>Over Limit By:</strong> <span style={{color: '#d32f2f', fontWeight: 'bold'}}>{formatValue(metrics?.over_by)} MT</span></li>
                                            <li><strong>Penalty Exposure:</strong> <span style={{color: '#d32f2f'}}>{formatValue(verdict?.penalty_risk_usd, 'currency')}</span></li>
                                        </ul>
                                    </Box>
                                </Grid>
                                {/* KPI Right Column */}
                                <Grid item xs={6}>
                                    <Box sx={{ bgcolor: '#f8f9fa', p: 1.5, borderRadius: 1, height: '100%' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem', mb: 1 }}>Primary Emissions Drivers</Typography>
                                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.75rem', lineHeight: '1.6' }}>
                                            <li><strong>Grid Electricity (Scope 2):</strong> {formatValue(locationData.der_control_panel?.current_mix_pct?.grid, 'percent')}</li>
                                            <li><strong>Natural Gas (Scope 1):</strong> {formatValue(locationData.der_control_panel?.current_mix_pct?.gas, 'percent')}</li>
                                            <li><strong>Limit Utilization:</strong> {formatValue(verdict?.limit_utilization_pct, 'percent')}</li>
                                        </ul>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        {/* --- 2. COMPLIANCE STATUS OVERVIEW --- */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#036cc1', fontSize: '1rem', mb: 1 }}>
                                2. Compliance Status Overview
                            </Typography>
                            <ul style={{ fontSize: '0.8rem', lineHeight: '1.5', margin: 0, paddingLeft: '1.2rem' }}>
                                <li><strong>Regulatory Context:</strong> Facility is subject to {metrics?.compliance_jurisdiction || 'Local'} BEPS requirements.</li>
                                <li><strong>Current Standing:</strong> <strong>{verdict?.severity}</strong> relative to emissions targets.</li>
                                <li><strong>Reduction Required:</strong> <strong>{formatValue(metrics?.required_reduction_pct, 'percent')}</strong> reduction needed to meet compliance.</li>
                                <li><strong>Forecasted Outcome:</strong> {verdict?.severity === 'COMPLIANT' ? 'Projected to Meet Target' : 'Projected Non-Compliance Without Intervention'}.</li>
                            </ul>
                        </Box>

                        {/* --- 3. DERLabsIQ IMPACT ASSESSMENT --- */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#036cc1', fontSize: '1rem', mb: 1 }}>
                                3. DERLabsIQ Impact Assessment
                            </Typography>
                            <ul style={{ fontSize: '0.8rem', lineHeight: '1.5', margin: 0, paddingLeft: '1.2rem' }}>
                                <li><strong>Emissions Reduction Potential:</strong> Up to <strong>{formatValue(metrics?.bradley_reduction_pct, 'percent')}</strong> reduction achievable via recommended DER deployment.</li>
                                <li><strong>Financial Impact:</strong> Projected annual savings of <strong>{formatValue(metrics?.bradley_savings, 'currency')}</strong> via avoided penalties and efficiency.</li>
                                <li><strong>Resilience Benefit:</strong> Improved critical-load support through recommended battery storage and local generation.</li>
                            </ul>
                        </Box>

                        {/* --- 4. PRIORITY ACTIONS --- */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#036cc1', fontSize: '1rem', mb: 1 }}>
                                4. Priority Actions
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {/* Action 1: Dynamic Recommendation */}
                                <Box sx={{ borderLeft: '4px solid #036cc1', pl: 1.5 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>1. Deploy Behind-the-Meter DER Systems</Typography>
                                    <Typography variant="caption" display="block" sx={{ color: '#555', fontSize: '0.75rem' }}>
                                        Recommended: {action?.components?.map(c => `${c.size} ${c.type}`).join(' + ')}
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem' }}>
                                        • Impact: {formatValue(metrics?.bradley_solution)} MT target emissions
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem' }}>
                                        • Financial: {formatValue(action?.payback_years)} year payback | Investment: {formatValue(action?.investment_usd, 'currency')}
                                    </Typography>
                                </Box>

                                {/* Action 2: Static / Dynamic SREC */}
                                <Box sx={{ borderLeft: '4px solid #7f8c8d', pl: 1.5 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>2. SREC & Offset Strategy</Typography>
                                    <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem' }}>
                                        • Impact: Purchase {formatValue(locationData.srec_metrics?.srec_needed_mwh)} MWh of SRECs
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem' }}>
                                        • Financial: Est. Cost {formatValue(locationData.srec_metrics?.total_srec_cost_usd, 'currency')} (Immediate Compliance)
                                    </Typography>
                                </Box>

                                {/* Action 3: Static Placeholder based on prompt */}
                                <Box sx={{ borderLeft: '4px solid #7f8c8d', pl: 1.5 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>3. Optimize HVAC & Lighting</Typography>
                                    <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem' }}>
                                        • Impact: Low-cost operational adjustments and LED retrofits.
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem' }}>
                                        • Financial: Proven ROI, fast payback.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* --- 5. METHODOLOGY --- */}
                        <Box sx={{ mt: 'auto', bgcolor: '#f1f2f6', p: 2, borderRadius: 2/* , pb: 6.7 */ }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.8rem', mb: 0.5 }}>
                                5. Data Methodology
                            </Typography>
                            <Grid container>
                                <Grid item xs={6}>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.65rem', color: '#666' }}>
                                        <li>GHG Protocol (Scope 1 & 2)</li>
                                        <li>ISO 14064-1:2018 Standards</li>
                                    </ul>
                                </Grid>
                                <Grid item xs={6}>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.65rem', color: '#666' }}>
                                        <li>Emission factors: EPA eGRID, IPCC AR5</li>
                                        <li>Inputs: Utility billing, operational data</li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ pb: 4.5}} />

                        {/* Footer */}
                        <Box sx={{ position: 'absolute', bottom: 10, width: '100%', textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#999', fontSize: '0.6rem' }}>
                                EmissionCheckIQ+ Generated Report | Page {index + 1}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </div>
    );
});

export default EmissionsReportTemplate;