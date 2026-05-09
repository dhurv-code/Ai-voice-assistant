# test_db.py

from app.database.conversation import save_message

save_message(
    "dhurv",
    "user",
    "Hello database"
)

print("Saved successfully")