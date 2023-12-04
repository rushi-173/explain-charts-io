type ActionButtonProps = {
    label?: string;
    isActive?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ActionButton = ({
    label,
    isActive,
    onClick,
}: ActionButtonProps) => {
    const className = `border-slate-200 border-[1px] rounded-md px-3 py-1 text-sm hover:border-violet-800 hover:text-violet-800 ${
        isActive ? 'border-violet-600 text-violet-600' : ''
    }`;
    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    );
};
