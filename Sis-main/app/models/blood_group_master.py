from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.constants import BLOOD_GROUP_NAME_MAX_LEN
from app.db.base_class import Base


class BloodGroupMaster(Base):
    __tablename__ = "blood_group_master"

    # Manually assigned PK - seed data supplies explicit IDs, so this is
    # NOT an identity column.
    blood_group_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=False)
    blood_group_name: Mapped[str] = mapped_column(
        String(BLOOD_GROUP_NAME_MAX_LEN), nullable=False, unique=True
    )
