import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { View, Text } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtTagProps } from '../../../types/tag'

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small'
}

export default class AtTag extends React.PureComponent<AtTagProps> {
  public static defaultProps: AtTagProps
  public static propTypes: InferProps<AtTagProps>

  private onClick(event: CommonEvent): void {
    const { name = '', active = false, disabled, onClick } = this.props
    if (!disabled) {
      typeof onClick === 'function' &&
        onClick(
          {
            name,
            active
          },
          event
        )
    }
  }

  public render(): JSX.Element {
    const {
      size = 'normal',
      disabled = false,
      active = false,
      customStyle
    } = this.props
    const rootClassName = ['at-tag']

    const classObject = {
      [`at-tag--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],
      'at-tag--disabled': disabled,
      'at-tag--active': active,
      'at-tag-gap': true
    }

    const textClassObject = {
      'at-tag--text': true,
      'at-tag--disabled--text': disabled,
      'at-tag--active--text': active
    }

    return (
      <View
        className={classNames(rootClassName, classObject, this.props.className)}
        style={customStyle}
        onClick={this.onClick.bind(this)}
      >
        <Text className={classNames(textClassObject)}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

AtTag.defaultProps = {
  size: 'normal',
  name: '',
  active: false,
  disabled: false,
  customStyle: {}
}

AtTag.propTypes = {
  size: PropTypes.oneOf(['normal', 'small']),
  name: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClick: PropTypes.func
}
