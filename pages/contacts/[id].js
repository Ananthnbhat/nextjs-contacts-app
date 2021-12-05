import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import utilStyles from '../../styles/util.module.css'
import profilePic from '../../public/images/profile-pic.jpg'
import callIcon from '../../public/icons/phone.svg'
import emailIcon from '../../public/icons/envelope-alt.svg'
import locationIcon from '../../public/icons/location.svg'
import websiteIcon from '../../public/icons/language.svg'
import { getEmailHref, getPhoneHref, getLocationString, getWebsiteHref } from '../../util'

function Contact({ contact }) {
    let phone = getPhoneHref(contact.phone)
    let mail = getEmailHref(contact.email)
    let location = getLocationString(contact.address.geo.lat, contact.address.geo.lng)
    let website = getWebsiteHref(contact.website)
    return (
        <div className={utilStyles.container}>
            <Head>
                <title>{contact.name} contact details</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={utilStyles.main}>
                <div className={utilStyles.grid}>
                    <div className={utilStyles.backToHome}>
                        <Link href="/">
                            <a>← Back to Contacts</a>
                        </Link>
                    </div>
                    <div className={utilStyles.card}>
                        <div className={utilStyles.centerImage}>
                            <Image
                                priority
                                src={profilePic}
                                className={utilStyles.profilePic}
                                height={108}
                                width={108}
                                alt='profile picture'
                            />
                            <h1>{contact.name}</h1>
                            <div className={utilStyles.iconWrapper}>
                                <a href={phone}><Image src={callIcon} /></a>
                                <a href={mail}><Image src={emailIcon} /></a>
                                <a href={location} target="_blank" rel="noopener noreferrer"><Image src={locationIcon} /></a>
                                <a href={website} target="_blank" rel="noopener noreferrer"><Image src={websiteIcon} /></a>
                            </div>
                        </div>
                        <p><span className={utilStyles.infoTitle}>Phone</span> <a className={utilStyles.link} href={phone}>{contact.phone}</a> </p>
                        <p><span className={utilStyles.infoTitle}>Email</span> <a className={utilStyles.link} href={mail}>{contact.email}</a> </p>
                        <p><span className={utilStyles.infoTitle}>Address</span> {contact.address.street}, {contact.address.suite}, {contact.address.city} </p>
                        <p><span className={utilStyles.infoTitle}>Zipcode</span>{contact.address.zipcode} </p>
                        <p><span className={utilStyles.infoTitle}>Website</span>{' '}
                            <Link href={website}>
                                <a target="_blank" rel="noopener noreferrer" className={utilStyles.link}>{contact.website}</a>
                            </Link>
                        </p>
                        <p><span className={utilStyles.infoTitle}>Company</span> {contact.company.name} </p>
                    </div>
                </div>
                <div className={utilStyles.backToHome}>
                    <Link href="/">
                        <a>← Back to Contacts</a>
                    </Link>
                </div>
            </main>
        </div>
    )
}

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get contacts
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const contacts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = contacts.map((contact) => ({
        params: { id: contact.id.toString() },
    }))
    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the contact `id`.
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?id=${params.id}`)
    let contact = await res.json()
    contact = contact[0]

    // Pass post data to the page via props
    return {
        props: {
            contact
        }
    }
}

export default Contact;