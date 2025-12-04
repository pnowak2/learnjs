class TestBytesEmbeddedSystems:
  def test_bin(self):
    assert(bin(7) == '0b111')
    assert(bin(15) == '0b1111')

  def test_hex(self):
    assert(hex(15) == '0xf')
    assert(hex(255) == '0xff')

  def test_byte_literal(self):
    assert(len(b'A') == 1)
    assert(len(b'ABC') == 3)

    assert(b'ABC'[0] == 65)
    assert(b'ABC'[1] == 66)
    assert(b'ABC'[2] == 67)

    assert(b'\xff'[0] == 255)
    assert(b'\xff'.hex() == 'ff')

    assert(bytes([0xff][0] == 255))

  def test_bytes(self):
    b = bytes(4)
    assert(b[0] == 0)