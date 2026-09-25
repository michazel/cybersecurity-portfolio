key = b"pizzapizzapizzapizzapizz"

local_68 = bytes.fromhex(
    "1d0811130f174915"
    "0d0003195a1d1315"
    "080e5a0017081314"
)

password = bytes(
    a ^ b
    for a, b in zip(key, local_68)
)

print(password)
print(password.decode())