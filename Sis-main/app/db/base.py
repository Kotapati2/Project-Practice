"""
This module must import Base and every single ORM model in the project.
alembic/env.py imports `Base` from here (and nothing else) so that
`target_metadata = Base.metadata` is fully populated before
`alembic revision --autogenerate` inspects it. If a model file is not
imported here, Alembic will silently ignore its table.
"""
from app.db.base_class import Base  # noqa: F401

# Import order follows FK dependency order (parents before children) so
# that anyone reading this file top-to-bottom also sees creation order,
# although import order itself has no effect on metadata collection.
from app.models.gender_master import GenderMaster  # noqa: F401
from app.models.blood_group_master import BloodGroupMaster  # noqa: F401
from app.models.students import Student  # noqa: F401
from app.models.family_details import FamilyDetails  # noqa: F401
from app.models.bank_details import BankDetails  # noqa: F401
from app.models.caste_master import CasteMaster
from app.models.sub_caste_master import SubCasteMaster
from app.models.religion_master import ReligionMaster
from app.models.nationality_master import NationalityMaster
from app.models.mother_tongue_master import MotherTongueMaster
from app.models.education_level_master import EducationLevelMaster
from app.models.year_level_master import YearLevelMaster
from app.models.medium_of_instruction_master import MediumOfInstructionMaster
from app.models.state_master import StateMaster
from app.models.income_master import IncomeMaster
from app.models.relationship_master import RelationshipMaster
from app.models.occupation_master import OccupationMaster
from app.models.bank_master import BankMaster
from app.models.skill_type_master import SkillTypeMaster
from app.models.sports_master import SportsMaster
from app.models.other_master import OtherMaster