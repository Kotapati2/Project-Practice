from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.constants import GENDER_NAME_MAX_LEN
from app.db.base_class import Base


class GenderMaster(Base):
    __tablename__ = "gender_master"

    # Manually assigned PK - seed data supplies explicit IDs, so this is
    # NOT an identity column.
    gender_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=False)
    gender_name: Mapped[str] = mapped_column(
        String(GENDER_NAME_MAX_LEN), nullable=False, unique=True
    )
