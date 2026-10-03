"""
Single source of truth for validation constants, VARCHAR lengths and
regex patterns shared between SQLAlchemy models (app/models) and
Pydantic schemas (app/schemas). Never duplicate a magic number/regex
elsewhere - import it from here.
"""

# ---------------------------------------------------------------------------
# VARCHAR lengths (must match the mapped_column(String(n)) lengths exactly)
# ---------------------------------------------------------------------------
PHOTO_MAX_LEN = 255
FULL_NAME_MAX_LEN = 100
FIRST_NAME_MAX_LEN = 50
SUR_NAME_MAX_LEN = 50
FATHER_NAME_MAX_LEN = 100
AADHAAR_LEN = 12
MOBILE_LEN = 10
EMAIL_MAX_LEN = 50
ADDRESS_MAX_LEN = 255
IDENTITY_MARK_MAX_LEN = 100
DISABILITIES_MAX_LEN = 5
DISABILITIES_DETAILS_MAX_LEN = 100
ADMISSION_NUMBER_MAX_LEN = 20
INCOME_CERT_NUMBER_MAX_LEN = 20

FAMILY_NAME_MAX_LEN = 50

BANK_ACCOUNT_HOLDER_NAME_MAX_LEN = 100
BANK_ACCOUNT_NUMBER_MAX_LEN = 20
PAN_LEN = 10

GENDER_NAME_MAX_LEN = 10
BLOOD_GROUP_NAME_MAX_LEN = 10

# ---------------------------------------------------------------------------
# Regex patterns
# ---------------------------------------------------------------------------
NAME_REGEX = r"^[A-Za-z ]+$"                      # no digits / special chars
AADHAAR_REGEX = r"^\d{12}$"
MOBILE_REGEX = r"^\d{10}$"
EMAIL_REGEX = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
IDENTITY_MARK_REGEX = r"^[A-Za-z0-9 ]+$"           # no special chars
ADMISSION_NUMBER_REGEX = r"^[A-Za-z0-9]+$"         # no special chars
NUMERIC_ONLY_REGEX = r"^\d+$"
PAN_REGEX = r"^[A-Z]{5}[0-9]{4}[A-Z]$"

# ---------------------------------------------------------------------------
# Business rules
# ---------------------------------------------------------------------------
MIN_STUDENT_AGE = 3  # years

# ---------------------------------------------------------------------------
# Master / option data (used both for seed migrations and API-layer checks)
# ---------------------------------------------------------------------------
GENDER_OPTIONS = [
    (1, "Male"),
    (2, "Female"),
    (3, "Other"),
]

BLOOD_GROUP_OPTIONS = [
    (1, "A+"),
    (2, "A-"),
    (3, "B+"),
    (4, "B-"),
    (5, "AB+"),
    (6, "AB-"),
    (7, "O+"),
    (8, "O-"),
]

# relationship_id / occupation_id have no dedicated master table in this
# scope, so they are validated at the API layer against these lists.
RELATIONSHIP_TYPES = [
    (1, "Father"),
    (2, "Mother"),
    (3, "Guardian"),
    (4, "Sibling"),
    (5, "Other"),
]

OCCUPATION_TYPES = [
    (1, "Farmer"),
    (2, "Business"),
    (3, "Private Employee"),
    (4, "Government Employee"),
    (5, "Homemaker"),
    (6, "Unemployed"),
    (7, "Other"),
]

DISABILITY_OPTIONS = ["Yes", "No"]
