# Menu API Back End

A RESTful API for managing restaurant menu data including menu sections, items, and tags using Express.js, Sequelize, and PostgreSQL.

## Description

This Menu API allows restaurant managers to efficiently manage menu data through a modern back-end system. It supports full CRUD operations for menu sections (like Appetizers, Entrees, Drinks), individual menu items (with pricing and stock information), and tags (like Vegan, Gluten-Free, Spicy) that can be associated with menu items.

## Features

- ✅ Complete CRUD operations for menu sections, items, and tags
- ✅ Many-to-many relationship between items and tags
- ✅ One-to-many relationship between sections and items
- ✅ RESTful API endpoints with JSON responses
- ✅ PostgreSQL database with Sequelize ORM
- ✅ Data validation and error handling

## Tech Stack
- Node.js + Express.js
- Sequelize ORM
- PostgreSQL

## Installation & Setup

### Prerequisites

You need to have PostgreSQL installed on your system. If you don't have it:

**macOS:**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Or download PostgreSQL from:** https://www.postgresql.org/download/

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (already created):

```env
DB_NAME='menu_db'
DB_USER='postgres'
DB_PASSWORD=''
```

Update `DB_USER` and `DB_PASSWORD` with your PostgreSQL credentials.

### 3. Create the Database

```bash
psql -U postgres -f db/schema.sql
```

Or use PgAdmin4 to create the database manually.

### 4. Seed the Database

This will drop and recreate tables with test data:

```bash
npm run seed
```

### 5. Start the Server

```bash
npm start
```

You should see:

```text
✅ Database connected & models synced
🌐 Server listening on http://localhost:3001
```

## API Routes

### Menu Sections

- `GET /api/sections` - Get all sections with their items
- `GET /api/sections/:id` - Get a specific section by ID with items
- `POST /api/sections` - Create a new section
  - Body: `{ "section_name": "Appetizers" }`
- `PUT /api/sections/:id` - Update a section by ID
  - Body: `{ "section_name": "Updated Name" }`
- `DELETE /api/sections/:id` - Delete a section by ID

### Menu Items

- `GET /api/items` - Get all items with their section and tags
- `GET /api/items/:id` - Get a specific item by ID with section and tags
- `POST /api/items` - Create a new item
  - Body: `{ "item_name": "Pizza", "price": 12.99, "in_stock": true, "section_id": 2, "tagIds": [1, 3] }`
- `PUT /api/items/:id` - Update an item by ID
  - Body: `{ "item_name": "Updated Pizza", "price": 14.99, "tagIds": [1, 2] }`
- `DELETE /api/items/:id` - Delete an item by ID

### Tags

- `GET /api/tags` - Get all tags with their items
- `GET /api/tags/:id` - Get a specific tag by ID with items
- `POST /api/tags` - Create a new tag
  - Body: `{ "tag_name": "Vegan" }`
- `PUT /api/tags/:id` - Update a tag by ID
  - Body: `{ "tag_name": "Updated Tag" }`
- `DELETE /api/tags/:id` - Delete a tag by ID

## Database Models

### MenuSection
- `id` - Integer, Primary Key, Auto-increment
- `section_name` - String, Not Null

### MenuItem
- `id` - Integer, Primary Key, Auto-increment
- `item_name` - String, Not Null
- `price` - Decimal(10,2), Not Null
- `in_stock` - Boolean, Default: true
- `section_id` - Foreign Key to MenuSection

### Tag
- `id` - Integer, Primary Key, Auto-increment
- `tag_name` - String

### MenuItemTag (Join Table)
- `id` - Integer, Primary Key, Auto-increment
- `item_id` - Foreign Key to MenuItem
- `tag_id` - Foreign Key to Tag

## Database Relationships

- MenuItem belongs to MenuSection (one-to-many)
- MenuSection has many MenuItem
- MenuItem belongs to many Tag (through MenuItemTag)
- Tag belongs to many MenuItem (through MenuItemTag)

## Testing with Insomnia/Postman

1. Start the server with `npm start`
2. Test GET routes first:
   - GET http://localhost:3001/api/sections
   - GET http://localhost:3001/api/items
   - GET http://localhost:3001/api/tags
3. Test POST to create new records
4. Test PUT to update records
5. Test DELETE to remove records

## Sample Data

The seed file includes:
- 4 Menu Sections: Appetizers, Entrees, Desserts, Drinks
- 6 Menu Items: Spring Rolls, Street Corn Dip, Grilled Salmon, Chicken Teriyaki, Churro Sundae, Iced Matcha Latte
- 5 Tags: Vegan, Gluten-Free, Spicy, Kids, Signature
- Multiple item-tag associations

## License

MIT

