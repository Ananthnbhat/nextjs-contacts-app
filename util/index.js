function getEmailHref(mail) {
    return "mailto:" + mail;
}
function getPhoneHref(number) {
    return "tel:" + number;
}
const onCopyStyle = {
    display: 'block',
    position: 'fixed',
    bottom: 0,
    right: 0,
    

}
const offCopyStyle = {
    display: 'none',
}
export {
    getEmailHref,
    getPhoneHref,
    onCopyStyle,
    offCopyStyle
}