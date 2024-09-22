
["migration:generate": "npm run typeorm migration:generate -- -d ./src/dataSource.ts"]  
### [-d] represents for dataSource

# typeorm cli does not support to revert specified migration, it supports revert the last migration,
# to revert a previous migration, you need to revert the current migration
# a Migration was generated with name [1722396409634-AlbumRefactoring3], the number before the underline is also the id of 
# this migration load into the database.
# The last migration means that the migration is the lowest field in the database
#

// Create an column type array of strings
# @Column('text', { array: true , nullable: true})
# howItMade?: string[]

