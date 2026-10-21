"""Browser regression: a recovery fragment alone must not authorize a password reset.

Run with: python3 tests/auth_recovery.py
"""
import asyncio
import unittest

from playwright.async_api import async_playwright


class RecoveryAccessTest(unittest.TestCase):
    def test_recovery_requires_verified_user(self):
        async def check():
            async with async_playwright() as playwright:
                browser = await playwright.chromium.launch(headless=True)
                page = await browser.new_page(viewport={"width": 1280, "height": 1800})
                for fragment in ("", "#type=recovery", "#type=recovery&access_token=invalid&refresh_token=invalid"):
                    await page.goto("http://localhost:8080/reset-password" + fragment)
                    await page.wait_for_timeout(1800)
                    self.assertFalse(await page.get_by_role("button", name="Salvar nova senha").is_visible())
                await browser.close()

        asyncio.run(check())


if __name__ == "__main__":
    unittest.main()