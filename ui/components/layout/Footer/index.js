/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { Input, Image } from '@theme-ui/components'
import { Heading, Text } from '~@/typography'
import { Icon, Logo, Button } from '~@/general'
import { SocialMedia } from '~@/other'

import payIconsUrl from '~/public/pay-icons.svg'
import styles from './style'

const Footer = () => {
    const g = ''
    return (
        <footer sx={styles.footer}>
            <div sx={styles.container}>
                <div sx={styles.newsletterWrap}>
                    <div sx={styles.iconWrap}>
                        <Icon name="newsletter" />
                    </div>
                    <div sx={styles.flexWrap}>
                        <div sx={styles.newsletterText}>
                            <Heading variant="h2" title color="primary.base">
                                Don't miss out!
                            </Heading>
                            <Text size={3}>Stay up-to-date with our exciting news and exclusive deals.</Text>
                            <Text size={3}>No spam, we promise.</Text>
                        </div>
                        <div sx={styles.formWrap}>
                            <Input />
                        </div>
                    </div>
                </div>
                <div sx={styles.footerContentWrap}>
                    <Logo plain color="primary.base" sx={styles.logoBox} />
                    <div sx={styles.footerContent}>
                        <div className="footer-card" sx={styles.contactBlock}>
                            <Heading variant="h6" color="primary.light">
                                Contact
                            </Heading>
                            <ul>
                                <li>
                                    <Icon name="location" />
                                    <span>24 Garden Court, Abuja</span>
                                </li>
                                <li>
                                    <Icon name="phone" />
                                    <span>
                                        <a href="tel:08000004444" rel="nofollow">
                                            080 0000 4444
                                        </a>
                                    </span>
                                </li>
                                <li>
                                    <Icon name="mail" />
                                    <span>
                                        <a href="mailto:hello@eateri.com" rel="nofollow">
                                            hello@eateri.com
                                        </a>
                                    </span>
                                </li>
                            </ul>
                            <Button size="sm" icon="chat">
                                Need to chat?
                            </Button>
                        </div>
                        <div className="footer-card" sx={styles.gmap}>
                            map
                        </div>
                        <div className="footer-card" sx={styles.hoursBlock}>
                            <Heading variant="h6" color="primary.light">
                                Opening Hours
                            </Heading>
                            <Text size={1} mb={2}>
                                10:00am - 9:00pm <span>(Mon - Fri)</span>
                            </Text>
                            <Text size={1} mb={2}>
                                11:00am - 10:30pm <span>(Sat - Sun)</span>
                            </Text>
                            <Button size="sm" brand="outline">
                                Reserve Now
                            </Button>
                            <div sx={styles.socialMediaWrap}>
                                <SocialMedia />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div sx={styles.copywright}>
                <Text size={0}>© 2020 Eateri Inc by elitenoire. Made with &#128153;</Text>
                <div sx={styles.payIcons}>
                    <Icon name="lock" />
                    <Image src={payIconsUrl} />
                </div>
            </div>
        </footer>
    )
}

export default Footer
