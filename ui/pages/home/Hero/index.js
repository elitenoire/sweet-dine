/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { Flex } from '@theme-ui/components'
import { useTabState, Tab, TabList, TabPanel } from 'reakit/Tab'
import { Media } from '~/context/media'
import useCounter from '~/hooks/useCounter'
import { Button, Icon } from '~@/general'
import { Reveal, fadeInDown, fadeIn, rollInBottom } from '~@/general/Reveal'
import { Carousel, CarouselCard } from '~@/display'
import { Heading, Text } from '~@/typography'
import { SocialMedia } from '~@/other'
import styles from './style'
import { foodMenu, menuList } from './data'
import url from '~/public/dish.png'

const Hero = () => {
    const { count, direction, increment: goNext, decrement: goPrev, isCyclic, goto, onStart, onEnd } = useCounter({
        end: foodMenu.length > 1 ? foodMenu.length - 1 : foodMenu.length || 0,
        isCyclic: true,
    })

    const { count: qty, increment, decrement, onStart: isMinQty, onEnd: isMaxQty } = useCounter({
        start: 1,
        end: 5,
    })

    const tabState = useTabState({
        baseId: 'chef-menu',
        manual: true,
        selectedId: `chef-menu-${menuList[0]}`,
    })

    return (
        <section id="homepage-hero" sx={styles.section}>
            <div sx={styles.main}>
                <div sx={styles.socialLinks}>
                    <SocialMedia />
                </div>
                <TabList {...tabState} aria-label="Chef's Special Menu" sx={styles.menuList}>
                    {menuList.map((_menu, idx) => (
                        <Tab
                            {...tabState}
                            as={Button}
                            key={idx + _menu}
                            id={`chef-menu-${_menu}`}
                            brand="ghost"
                            shape="flat"
                            size="md"
                            ghostText
                        >
                            {_menu}
                        </Tab>
                    ))}
                </TabList>
                <div sx={styles.contentGrid} className="content-panel grid-tabletS-up">
                    <div sx={styles.contentDetails} className="A">
                        <div>
                            <Text className="only-mobile" size={7}>
                                Hello,{' '}
                                <Text as="span" weight="bold">
                                    Guest
                                </Text>
                            </Text>
                            <Heading sx={styles.contentHeadline}>Chef's Special</Heading>
                        </div>
                        <Reveal
                            as={Heading}
                            forwardAs="h4"
                            variant="h1"
                            key={foodMenu[count].name}
                            className="tabletS-up"
                            my={1}
                            sx={styles.contentTitle}
                            motion={fadeInDown}
                            delay={100}
                            cascade
                        >
                            {foodMenu[count].name}
                        </Reveal>
                        <Reveal motion={fadeInDown} duration={800}>
                            <Text key={foodMenu[count].name} className="tabletS-up" sx={styles.contentDesc} overflow>
                                {foodMenu[count].description}
                            </Text>
                        </Reveal>
                        <Media lessThan="tabletS" sx={styles.carouselMobile}>
                            <Carousel
                                items={foodMenu}
                                selected={count}
                                visible={3}
                                animation="stack"
                                goto={goto}
                                direction={direction}
                            >
                                {d => <CarouselCard data={d} isMobile />}
                            </Carousel>
                        </Media>
                    </div>
                    <Reveal as="div" motion={rollInBottom} duration={800} sx={styles.contentImage} className="B">
                        <img
                            key={`img-${foodMenu[count].name}`}
                            className="test"
                            src={url}
                            alt={foodMenu[count].name}
                        />
                    </Reveal>
                    <div sx={styles.contentOrder} className="C">
                        <Reveal motion={fadeIn}>
                            <Text key={foodMenu[count].price} sx={styles.contentPrice}>
                                {`₦${foodMenu[count].price}`}
                            </Text>
                        </Reveal>
                        <Flex sx={styles.contentQty}>
                            <Button
                                brand="ghost"
                                color="accent"
                                size="sm"
                                icon="subtract"
                                ariaLabel="Decrease meal quantity"
                                onClick={decrement}
                                disabled={isMinQty}
                            />
                            <Text mx={3}>{qty}</Text>
                            <Button
                                brand="ghost"
                                color="accent"
                                size="sm"
                                icon="add"
                                ariaLabel="Increase meal quantity"
                                onClick={increment}
                                disabled={isMaxQty}
                            />
                        </Flex>
                        <Button brand="outline" size="lg" icon="cart">
                            Order Now
                        </Button>
                    </div>
                </div>
            </div>
            <Media greaterThanOrEqual="tabletS" sx={styles.controls}>
                <div sx={styles.arrows}>
                    <Button
                        brand="outline"
                        color="accent"
                        icon="arrowleft"
                        ariaLabel="Previous Special"
                        onClick={goPrev}
                        disabled={onStart}
                    />
                    <Text sx={styles.counts}>
                        <Reveal motion={fadeIn} duration={500}>
                            <Text as="span" key={count} size={5} weight="bold">
                                {count + 1}
                            </Text>
                        </Reveal>
                        /{foodMenu.length}
                    </Text>
                    <Button
                        brand="outline"
                        color="accent"
                        icon="arrowright"
                        ariaLabel="Next Special"
                        onClick={goNext}
                        disabled={onEnd}
                    />
                </div>
                <Carousel
                    items={foodMenu}
                    selected={count}
                    visible={3}
                    animation="slide"
                    itemOffset={0}
                    goto={goto}
                    direction={direction}
                    infinite={isCyclic}
                >
                    {i => <CarouselCard data={i} />}
                </Carousel>
            </Media>
        </section>
    )
}

export default Hero
