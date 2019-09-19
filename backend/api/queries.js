// consulta recursiva psql
module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}


// consulta no psql

// WITH RECURSIVE subcategories(id) AS(
//     SELECT id FROM categories WHERE id = 3
//         UNION ALL
//             SELECT c.id FROM subcategories, categories c
//                 WHERE "parentId" = subcategories.id
// )
// SELECT id FROM subcategories;