# Strapi v5 Technical Test 

## What I Built

### Models
- Tag: has name and color field
- Article: has name and tags (many-to-many)
- Articles need at least 2 tags or it throws an error

### Custom Field Plugin
- Made a color dropdown field
- Colors: red, blue, green, yellow, purple, orange
- It's called `badgeColor`


## How to Test

```bash
npm run develop
```

### Custom Field
1. Go to Content-Type Builder → Tag
2. The `badgeColor` field should be there already
3. If not, add it from the CUSTOM tab (should be called "Badge Color")

### Article Validation
1. Try creating an Article with less than 2 tags
2. Should get error message
3. Add 2+ tags and it works

### Color Field
1. Go to Tags in Content Manager
2. Create/edit a tag
3. Pick a color from dropdown
4. Save it

## Files

### Important stuff
- `src/api/article/content-types/article/lifecycles.ts` - validation logic
- `src/api/tag/content-types/tag/schema.json` - tag model with color field
- `src/plugins/my-custom-field/` - the color field plugin
- `config/plugins.ts` - plugin config

### Plugin structure
```
src/plugins/my-custom-field/
├── server/src/
│   ├── index.ts
│   └── register.ts
└── admin/src/
    └── index.ts (the React dropdown)
```

## If stuff breaks

- Restart strapi: `npm run develop`
- Check if plugin is enabled in `config/plugins.ts`
- Make sure you have 2+ tags when creating articles
- Custom field should be in Content-Type Builder under CUSTOM tab

## Notes
- Used lifecycle hooks for validation (beforeCreate/beforeUpdate)
- Custom field is registered as `plugin::color-badge.badgeColor`
- Colors are saved as strings like "red", "blue" etc
- Removed the collapsible menu stuff since it wasn't needed
