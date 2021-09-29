picture = [
  [0,0,0,1,0,0,0],
  [0,0,1,1,1,0,0],
  [0,1,1,1,1,1,0],
  [1,1,1,1,1,1,1],
  [0,0,1,1,1,0,0],
  [0,0,1,1,1,0,0],
]

def draw_picture(picture, fill = '*', empty=' '):
  image = ''
  for row in picture:
    for dot in row:
      if(dot):
        image += fill
      else: 
        image += empty 
    image += '\n'
  return image

print(draw_picture(picture))
print(draw_picture(picture, fill='8', empty='.'))
  