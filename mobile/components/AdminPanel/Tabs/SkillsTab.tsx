import React from 'react';
import ContentEditor from './ContentEditor';

const SkillsTab = ({ data, onChange }: any) => {
    return <ContentEditor data={data} onChange={onChange} type="skill" />;
};

export default SkillsTab;
