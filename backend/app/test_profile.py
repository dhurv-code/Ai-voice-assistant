from app.core.profile_manager import (
    create_default_profile,
    get_profile
)

create_default_profile()

profile=get_profile()

print(profile)