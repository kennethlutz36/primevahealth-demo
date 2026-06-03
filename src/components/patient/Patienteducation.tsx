// ── PatientEducation ──────────────────────────────────────────────────
// Patient education page reuses the provider Education component with isProvider=false
import React from 'react';
import Education from '../provider/ProviderEducationHub';

const PatEducation = () => <Education isProvider={false} />;
export default PatEducation;
