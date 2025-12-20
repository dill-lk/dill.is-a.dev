// Migration helper - run this once to update existing links with proper defaults
const migrateLinks = () => {
    const stored = localStorage.getItem('titanium_links');
    if (stored) {
        const links = JSON.parse(stored);
        const updated = links.map((link) => {
            // If link doesn't have custom colors, set them based on variant
            if (!link.bgColor) {
                if (link.variant === 'solid') {
                    link.bgColor = '#ffffff';
                    link.textColor = '#000000';
                    link.shadow = true;
                } else if (link.variant === 'glass') {
                    link.bgColor = '#1C1C1E';
                    link.textColor = '#ffffff';
                    link.shadow = false;
                } else if (link.variant === 'outline') {
                    link.bgColor = 'transparent';
                    link.textColor = '#ffffff';
                    link.shadow = false;
                }
            }

            // Set defaults for missing properties
            if (!link.size) link.size = 'md';
            if (!link.roundness) link.roundness = 'rounded';
            if (link.shadow === undefined) link.shadow = link.variant === 'solid';

            return link;
        });

        localStorage.setItem('titanium_links', JSON.stringify(updated));
        console.log('✅ Links migrated with proper defaults');
    }
};

// Run migration
migrateLinks();
