import * as React from 'react';

export default {
  register(app: any) {
    // Register the custom badge color field
    app.customFields.register({
      name: 'badgeColor',
      pluginId: 'color-badge',
      type: 'string',
      intlLabel: {
        id: 'color-badge.badgeColor.label',
        defaultMessage: 'Badge Color',
      },
      intlDescription: {
        id: 'color-badge.badgeColor.description',
        defaultMessage: 'Select a color for the badge',
      },
      components: {
        Input: async () => {
          const Input = React.forwardRef<HTMLSelectElement, any>((props, ref) => {
            const { attribute, disabled, intlLabel, name, onChange, required, value } = props;
            
            const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
              onChange({
                target: { name, type: attribute?.type || 'string', value: e.currentTarget.value },
              });
            };

            const colors = [
              { value: '', label: 'Select a color' },
              { value: 'red', label: 'Red' },
              { value: 'blue', label: 'Blue' },
              { value: 'green', label: 'Green' },
              { value: 'yellow', label: 'Yellow' },
              { value: 'purple', label: 'Purple' },
              { value: 'orange', label: 'Orange' },
            ];

            return React.createElement('div', {}, [
              React.createElement('label', { 
                key: 'label', 
                style: { display: 'block', marginBottom: '8px', fontWeight: 'bold' } 
              }, intlLabel?.defaultMessage || 'Badge Color'),
              React.createElement('select', {
                key: 'select',
                ref,
                name,
                disabled,
                value: value || '',
                required,
                onChange: handleChange,
                style: {
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }
              }, colors.map(color => 
                React.createElement('option', { 
                  key: color.value, 
                  value: color.value 
                }, color.label)
              ))
            ]);
          });

          return { default: Input };
        },
      },
    });
  },
};
