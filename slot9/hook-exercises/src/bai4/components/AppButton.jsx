import Button from 'react-bootstrap/Button';

const AppButton = ({
  children,
  variant = 'primary',
  type = 'button',
  ...props
}) => {
  return (
    <Button variant={variant} type={type} {...props}>
      {children}
    </Button>
  );
};

export default AppButton;