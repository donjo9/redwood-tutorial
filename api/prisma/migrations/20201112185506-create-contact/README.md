# Migration `20201112185506-create-contact`

This migration has been generated by = at 11/12/2020, 7:55:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201111191135-create-posts..20201112185506-create-contact
--- datamodel.dml
+++ datamodel.dml
@@ -1,9 +1,9 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
@@ -15,4 +15,12 @@
   title String
   body String
   createdAt DateTime  @default(now())
 }
+
+model Contact {
+  id  Int @id @default(autoincrement())
+  name  String
+  email String
+  message String
+  createdAt DateTime @default(now())
+}
```


