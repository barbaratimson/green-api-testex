import './Button.scss'

interface ButtonProps {
    children: any
    active?: boolean
    className?: string
    onClick?: () => void
}

export const Button = ({children, className, onClick}: ButtonProps) => {
    return (
        <button onClick={onClick} className={`button ${className ?? ""}`}>{children}</button>
    );
};