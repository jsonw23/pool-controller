from pathlib import Path
from ariadne import gql

schema_dir = Path("controller/schema")
combined_schema = "\n".join(f.read_text() for f in schema_dir.glob("*.graphql"))
type_defs = gql(combined_schema)