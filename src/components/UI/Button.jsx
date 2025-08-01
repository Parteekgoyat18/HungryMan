export default function Button({children , textOnly ,onClick, className , ...props}) {
    let cssClasses = textOnly ? "text-button" : "button" ; 
    cssClasses += ' ' + className ; 
    return (
        <button className={cssClasses} type="button" onClick={onClick} {...props}>{children}</button>
 );
}