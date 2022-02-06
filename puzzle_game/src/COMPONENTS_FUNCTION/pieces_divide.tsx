import React from 'react'

export default function devide(
  up: number,
  right: number,
  left: number,
  down: number
): string {
  var up_string = ''
  var right_string = ''
  var left_string = ''
  var down_string = ''
  if (up == 1) up_string = 'up'
  if (right == 1) up_string = 'right'
  if (left == 1) up_string = 'left'
  if (down == 1) up_string = 'down'
  var output =
    up_string + '-' + right_string + '-' + left_string + '-' + down_string
  return output
}
