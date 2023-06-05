from os import system
from typing import Dict, List, Tuple, Union

import psycopg2
from dotenv import dotenv_values, load_dotenv

load_dotenv()

CONFIG: Dict = dotenv_values("config.env")
DSN: str = CONFIG.get("DB_URL")


class App:
    """The Credential Manager itself."""

    def __init__(self):
        self.username: str = None
        self.password: str = None

        self.db = None
        self.cursor: psycopg2.cursor = None
        try:
            self.db = psycopg2.connect(dsn=DSN)
            self.cursor = self.db.cursor()
            system("cls")
            self.help()
        except psycopg2.Error as connection_error:
            return print(connection_error)

    def help(self):
        while True:
            if self.username is None:
                x = int(input(
                    "\nEnter the number for invoking the command.\n\n1. Signup\n2. Login\n3. Exit\n\nYour Input: "))
                if x == 1:
                    self.signup()
                elif x == 2:
                    self.login()
                elif x == 3:
                    exit()
                else:
                    print("Dear User ─ You have entered a wrong option.")
            if self.username:
                y = int(input(
                    f"\nEnter the number for invoking the command {self.username}.\n\n1. Enter Creds\n2. View Creds\n3. Logout\n4. Delete Account\n\n\nYour Input: "))
                if y == 1:
                    self.enter_credentials()
                elif y == 2:
                    self.view_credentials()
                elif y == 3:
                    self.logout()
                elif y == 4:
                    self.delete_account()
                else:
                    print(f"{self.username} ─ You have entered a wrong option.")

    def signup(self):
        """Signup to use the app."""
        username: Union[str, int] = input("\nEnter Username: ").strip()
        password: Union[str, int] = input("Enter Password: ").strip()

        self.cursor.execute("SELECT username FROM users")
        fetched_usernames = self.cursor.fetchall()

        username_list: List[Tuple[str]] = []
        try:
            for data in fetched_usernames:
                username_list.append(data)
        except TypeError:
            pass

        if username == password:
            print("Both your username and password are same, please change one of them.")
            return self.signup()

        for users in username_list:
            if username in users:
                print(f"{username} is already taken. Try another one please.")
                return

        self.username = username
        self.password = password

        create_table: str = f"""CREATE TABLE {self.username} (
                                    id BIGSERIAL PRIMARY KEY,
                                    service TEXT NOT NULL,
                                    username TEXT NOT NULL,
                                    password TEXT NOT NULL)"""

        self.cursor.execute(
            "INSERT INTO users VALUES (%s, %s)",
            (self.username,
             self.password))
        self.cursor.execute(create_table, (self.username,))
        self.db.commit()
        print(
            f"Thank you for signing up for BSOD'd Credential Manager {self.username}!\n")
        system("cls")
        self.help()

    def login(self):
        """Login to the app."""
        username: Union[str, int] = input("\nEnter Username: ").strip()
        password: Union[str, int] = input("Enter Password: ").strip()

        self.cursor.execute(
            "SELECT * FROM users WHERE username = %s", (username,))
        fetched_users: List[Tuple] = self.cursor.fetchall()

        user_data_list: List[Tuple[str]] = []
        try:
            for data in fetched_users:
                user_data_list.append(data)
        except TypeError:
            pass

        if not user_data_list:
            return print(
                f"\n\nThere is no username called {username}. Please signup!")

        if username == password:
            print("Both your username and password are same.")
            system("cls")
            return self.login()

        for data in user_data_list:
            if password not in data:
                print(
                    f"{username} ─ you have entered the wrong password. Please try again.")
                system("cls")
                return self.login()

            if username.strip() in data:
                self.username = username.strip()
                self.password = password.strip()
                print(f"Welcome back {self.username}!")
                system("cls")

    def logout(self):
        """Logout lol."""
        confirmation: int = int(
            input("\nAre you sure you want to quit?\n\n1. Yes\n2. No\n\nEnter the number: "))
        if confirmation == 1:
            self.username = self.password = None
        elif confirmation == 2:
            self.help()
        else:
            print(f"{self.username} ─ You have entered a wrong option.")
            return self.login()

    def delete_account(self):
        """Delete your account."""
        confirmation: int = int(input(
            "\nAre you sure you want to delete all information?\n\n1. Yes\n2. No\n\nEnter the number: "))
        if confirmation == 1:
            self.cursor.execute(
                "DELETE FROM users WHERE username = %s", (self.username, ))
            self.cursor.execute(f"DROP TABLE {self.username}")
            self.db.commit()
            self.username = self.password = None
            return print("Done!")
        elif confirmation == 2:
            print(
                f"Don't you worry {self.username} ─ Your information is safe with me lol.")
            system("cls")
        else:
            print(
                f"{self.username} ─ Your options were only either to choose `Yes` or `No`. Please try again.")
            system("cls")
            return self.delete_account()

    def enter_credentials(self):
        """Enter Credentials."""
        service: str = input(
            "\nEnter the website or any other service's name which you have signed up for: ").strip()
        username: str = input(f"Enter your username for {service}: ").strip()
        password: str = input(f"Enter the password for {service}: ").strip()

        self.cursor.execute(
            f"INSERT INTO {self.username} VALUES (DEFAULT, %s, %s, %s)",
            (service,
             username,
             password,
             ))
        self.db.commit()
        print(f"{self.username}! You have:\n─ Entered for Service: {service}\n─ Your Username: {username}\n─ Password for {service}: {password}")
        system("cls")

    def view_credentials(self):
        """View all of your credentials."""
        self.cursor.execute(f"SELECT * FROM {self.username}")
        print("\n")
        fetched_credentials = self.cursor.fetchall()
        if not fetched_credentials:
            print(f"{self.username} ─ you haven't entered any credentials in here.")
            return input("\n\nPress any key to continue: ")

        credentials_list: List[str] = [
            f"ID: {data[0]}\nService: {data[1]}\nUsername: {data[2]}\nPassword: {data[3]}\n─────\n" for data in fetched_credentials]
        print("".join(credentials_list))
        input("\n\nPress any key to continue: ")
        system("cls")


i = App()
