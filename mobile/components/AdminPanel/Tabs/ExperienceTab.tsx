import React from 'react';
import ContentEditor from './ContentEditor';

const ExperienceTab = ({ data, onChange }: any) => {
    return <ContentEditor data={data} onChange={onChange} type="experience" />;
};

export default ExperienceTab;
