import smtplib

def send_email(text):
    email = "ceferino.troya.r@gmail.com"
    receiver_email = "wolfest2899@gmail.com"

    subject = "cotizacion"
    message = text

    email_text = f"Subject: {subject}\n\n{message}"

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login(email, "iwfv xcik owce xvbb")

    server.sendmail(email, receiver_email, email_text)

    print("Email has been sent to " + receiver_email)
