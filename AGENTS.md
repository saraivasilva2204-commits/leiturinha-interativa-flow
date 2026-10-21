# Project rules
- Password recovery must verify the user after processing recovery tokens; URL fragments alone never authorize password changes.
- Browser access regressions live in `tests/` and run against the existing local preview without storing test credentials in the project.