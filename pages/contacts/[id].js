import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import utilStyles from '../../styles/util.module.css'
import profilePic from '../../public/images/profile-pic.jpg'
import callIcon from '../../public/icons/phone.svg'
import emailIcon from '../../public/icons/envelope-alt.svg'
import locationIcon from '../../public/icons/location.svg'
import websiteIcon from '../../public/icons/language.svg'

function Contact({ contact }) {
    let mail = "mailto:" + contact.email;
    let phone = "tel:" + contact.phone;
    let location = `http://maps.google.com/maps?z=12&t=m&q=loc:${contact.address.geo.lat}+${contact.address.geo.lng}`
    let website = "https://" + contact.website;
    return (
        <div className={utilStyles.container}>
            <Head></Head>
            <main className={utilStyles.main}>
                <div className={utilStyles.grid}>
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
                                <a href={location} target="_blank"><Image src={locationIcon} /></a>
                                <a href={website} target="_blank"><Image src={websiteIcon} /></a>
                            </div>
                        </div>
                        <p><span className={utilStyles.infoTitle}>Phone</span> {contact.phone} </p>
                        <p><span className={utilStyles.infoTitle}>Email</span> {contact.email} </p>
                        <p><span className={utilStyles.infoTitle}>Address</span> { } </p>
                        <p><span className={utilStyles.infoTitle}>Website</span>{' '}
                            <Link href={website}>
                                <a target="_blank" className={utilStyles.link}>{contact.website}</a>
                            </Link>
                        </p>
                        <p><span className={utilStyles.infoTitle}>Company</span> {contact.company.name} </p>
                    </div>
                </div>
                <div className={utilStyles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
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