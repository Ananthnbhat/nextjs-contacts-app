export const getEmailHref = (mail) => "mailto:" + mail;
export const getPhoneHref = (number) => "tel:" + number;
export const getLocationString = (lat, lng) => `http://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${lng}`
export const getWebsiteHref = (website) => "https://" + website;

export const onCopyStyle = {
    display: 'block',
    position: 'fixed',
    bottom: 0,
    right: 0,
    backgroundColor: '#2a9d8f',
    padding: '1rem 2rem',
    color: 'white',
    borderRadius: '4px'

}

export const offCopyStyle = {
    display: 'none',
}