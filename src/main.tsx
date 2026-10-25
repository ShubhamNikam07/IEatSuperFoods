import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline, Button, Drawer, IconButton, Chip, Accordion, AccordionSummary, AccordionDetails, Alert, CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { store, RootState, AppDispatch, loadProducts, add, change, clear } from './store';
import './style.css';

const theme = createTheme({
  palette: {
    primary: { main: '#583226', contrastText: '#fff3d9' },
    secondary: { main: '#ead1a1', contrastText: '#43281f' },
    background: { default: '#f5ecd8', paper: '#fbf3e3' },
    text: { primary: '#482b23', secondary: '#796454' },
    divider: '#d9c9ad',
  },
  typography: { fontFamily: 'Arial, sans-serif', button: { textTransform: 'none', fontWeight: 700 } },
  shape: { borderRadius: 10 },
});

const asset = (path: string) => import.meta.env.BASE_URL + 'images/' + path;
const photos = [
  { key: 'brand-promise', alt: 'SuperFoods No Means No poster with jaggery, desi cow ghee and a plate of cookies', title: 'A promise on every pack.', category: 'THE BRAND PROMISE', caption: 'Familiar ingredients. A little more thought in every bite.' },
  { key: 'brand-celebration', alt: 'SuperFoods cookie boxes displayed beside a decorated Ganesh idol', title: 'Part of the celebration.', category: 'MOMENTS TO SHARE', caption: 'A glimpse of the brand in a festive setting.' },
  { key: 'chai-moment', alt: 'SuperFoods campaign with a woman enjoying a cookie beside a green five-grain cookie box', title: 'Your kind of pause.', category: 'THE EVERYDAY RITUAL', caption: 'A quiet corner, a warm cup, and something crunchy.' },
  { key: 'community-at-home', alt: 'A person at home holding a SuperFoods five-grain cookie box toward the camera', title: 'A little closer to home.', category: 'AT HOME', caption: 'An everyday moment with a familiar green pack.' },
  { key: 'community-on-the-go', alt: 'A man in a blue blazer holding a SuperFoods five-grain cookie box', title: 'Goodness, along for the day.', category: 'OUT & ABOUT', caption: 'The brand, seen through the people holding it.' },
];

function BrandImage({ index, eager = false }: { index: number; eager?: boolean }) {
  const photo = photos[index];
  return <img src={asset('enhanced/' + photo.key + '.png')} alt={photo.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.catalog);
  const qty = useSelector((s: RootState) => s.cart.quantities);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  useEffect(() => { dispatch(loadProducts()); }, [dispatch]);
  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const viewPhoto = (index: number) => { setShowOriginal(false); setSelectedPhoto(index); };
  return <>
    <div className="announcement">A little goodness. A lot of crunch. <span>Made for those who read the label.</span></div>
    <header>
      <a className="logo" href="#" aria-label="I Eat SuperFoods home">I EAT <strong>SuperFoods<span>®</span></strong><small>Made for those who read the label.</small></a>
      <nav aria-label="Main navigation"><a href="#collection">The cookies</a><a href="#story">Our ingredients</a><a href="#moments">Brand moments</a><a href="#faq">Good to know</a></nav>
      <Button variant="outlined" onClick={() => setOpen(true)} aria-label={'Open bag, ' + count + ' items'}>Bag · {count}</Button>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">GOOD INGREDIENTS. FAMILIAR COMFORT.</div>
          <h1>A little crunch.<br />A little comfort.<br /><em>A lot of heart.</em></h1>
          <p>Your everyday pause, made a little better. Discover ragi and five-grain cookies, made with desi cow ghee and sweetened with jaggery.</p>
          <Button size="large" variant="contained" href="#collection">Find your favourite <span className="arrow" aria-hidden="true">↗</span></Button>
          <div className="mini-notes">Grains. Ghee. Jaggery. <i aria-hidden="true">✦</i> The joy of a simple bite.</div>
          <a className="text-link" href="#moments">Meet the moments behind the brand <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-art">
          <span className="hero-side-note" aria-hidden="true">BAKED INTO THE EVERYDAY</span>
          <button className="image-button hero-poster" onClick={() => viewPhoto(0)} aria-label="View the SuperFoods brand promise poster"><BrandImage index={0} eager /><span className="image-zoom" aria-hidden="true">View artwork ↗</span></button>
          <span className="art-caption">THE SIMPLE THINGS. DONE WITH CARE.</span>
        </div>
      </section>
      <div className="ribbon"><span>DESI COW GHEE</span><i aria-hidden="true">✦</i><span>RAGI & FIVE GRAINS</span><i aria-hidden="true">✦</i><span>SWEETENED WITH JAGGERY</span><i aria-hidden="true">✦</i><span>A LITTLE EVERYDAY JOY</span></div>
      <section id="collection" className="section collection">
        <div className="section-heading"><div><div className="eyebrow">THE COOKIE CUPBOARD</div><h2>Good things come<br />in crunchy packages.</h2></div><p>Two delicious ways to take a break.<br />Which one is your kind of cookie?</p></div>
        <div className="products">
          {loading && <CircularProgress aria-label="Loading cookies" />}
          {error && <Alert severity="error" action={<Button onClick={() => dispatch(loadProducts())}>Retry</Button>}>Could not load the collection.</Alert>}
          {items.map((p, i) => <article key={p.id}>
            <div className={'product-art tone-' + i}>
              <Chip label={i ? 'FIVE GRAINS, ONE FAVOURITE' : 'MEET THE ORIGINAL'} size="small" />
              <div className="pack"><small>I EAT</small><b>SuperFoods</b><hr /><h3>Desi Cow Ghee<br />{i ? '5-Grain' : 'Ragi'}<br />Cookies</h3><span>Sweetened with jaggery</span><div className="cookie" aria-hidden="true">✦</div><small>Made for those who read the label.</small></div>
              <span className="caption">ILLUSTRATIVE PACKAGING</span>
            </div>
            <div className="product-info"><h3>{p.name}</h3><p>{p.note}</p><div><span>₹{p.price} <small>demo price</small></span><Button variant="outlined" onClick={() => { dispatch(add(p.id)); setDone(false); setOpen(true); }}>Add to bag +</Button></div></div>
          </article>)}
        </div>
      </section>
      <section id="story" className="story section">
        <div className="story-visual"><button className="image-button" onClick={() => viewPhoto(2)} aria-label="View the SuperFoods chai break campaign"><BrandImage index={2} /><span className="image-zoom" aria-hidden="true">A moment of goodness ↗</span></button><span className="photo-footnote">A FAMILIAR PACK. A FAVOURITE LITTLE RITUAL.</span></div>
        <div className="story-copy"><div className="eyebrow">A SIMPLER KIND OF SNACKING</div><h2>Back to<br /><em>the good stuff.</em></h2><p>Some moments deserve slowing down. A cup of chai, a favourite book, and a cookie with ingredients worth getting to know.</p>
          {[
            ['01', 'The grain story', 'Discover the earthy character of ragi and a five-grain blend.'],
            ['02', 'The ghee touch', 'Desi cow ghee brings richness to every little bite.'],
            ['03', 'A familiar sweetness', 'Sweetened with jaggery. Check the pack for ingredients and nutrition.'],
          ].map(x => <div className="ingredient" key={x[0]}><span>{x[0]}</span><div><h3>{x[1]}</h3><p>{x[2]}</p></div></div>)}
        </div>
      </section>
      <section id="moments" className="section moments">
        <div className="section-heading"><div><div className="eyebrow">BEYOND THE COOKIE BOX</div><h2>Familiar faces.<br /><em>Everyday connections.</em></h2></div><p>From festive tables to little pauses at home.<br />A few moments from the world of SuperFoods.</p></div>
        <div className="moments-grid">{[1, 3, 4].map(index => <figure className="moment-card" key={photos[index].key}>
          <button className="image-button" onClick={() => viewPhoto(index)} aria-label={'View photo: ' + photos[index].title}><BrandImage index={index} /><span className="image-zoom" aria-hidden="true">Take a closer look ↗</span></button>
          <figcaption><span className="eyebrow">{photos[index].category}</span><h3>{photos[index].title}</h3><p>{photos[index].caption}</p></figcaption>
        </figure>)}</div>
        <p className="gallery-note">Shared brand imagery, thoughtfully enhanced. Tap a photo to explore it and view the original.</p>
      </section>
      <section className="occasion section"><div className="eyebrow">MAKE A MOMENT OF IT</div><h2>For chai breaks.<br />And just-because breaks.</h2><p>A desk-side companion. A thoughtful little gift.<br />Something delicious to share with your favourite people.</p><Button variant="contained" href="#collection">Explore the collection ↗</Button></section>
      <section id="faq" className="section faq"><div><div className="eyebrow">A FEW CRUMBS OF KNOWLEDGE</div><h2>Good to know.</h2></div><div>{[
        ['Can I place an order here?', 'This is an independent website concept. The bag is interactive, but no payment is collected and no order is placed. Prices are illustrative.'],
        ['Where can I check the ingredients?', 'Refer to the current product packaging and ask the brand for its full ingredient, allergen and nutrition information before purchasing.'],
        ['Is jaggery sugar-free?', 'No. Jaggery is a sugar ingredient. Please refer to the nutrition panel and serving size.'],
        ['Want this website for your brand?', 'Contact raavithegreat7@gmail.com to discuss a real website, catalogue management and ordering features.'],
      ].map(([q, a]) => <Accordion key={q} elevation={0}><AccordionSummary expandIcon={<span>+</span>}>{q}</AccordionSummary><AccordionDetails>{a}</AccordionDetails></Accordion>)}</div></section>
      <section className="contact"><div><div className="eyebrow">LIKE WHAT YOU SEE?</div><h2>Let’s make your brand’s<br />next chapter look this good.</h2></div><Button variant="contained" color="secondary" href="mailto:raavithegreat7@gmail.com?subject=Website%20enquiry">Let’s build your website ↗</Button><a href="mailto:raavithegreat7@gmail.com">raavithegreat7@gmail.com</a></section>
    </main>
    <footer><div className="logo">I EAT <strong>SuperFoods</strong></div><p>Independent demo concept · Not an official brand store.<br />Brand imagery belongs to its respective owner.</p><a href="https://www.instagram.com/ieatsuperfoods/" target="_blank" rel="noreferrer">Visit the brand on Instagram ↗</a></footer>
    <Dialog open={selectedPhoto !== null} onClose={() => setSelectedPhoto(null)} maxWidth="md" fullWidth aria-labelledby="photo-title">
      {selectedPhoto !== null && <><DialogTitle id="photo-title" className="photo-dialog-title"><span>{photos[selectedPhoto].title}</span><IconButton aria-label="Close photo" onClick={() => setSelectedPhoto(null)}>×</IconButton></DialogTitle><DialogContent className="photo-dialog-content">
        <img src={asset((showOriginal ? 'originals/' : 'enhanced/') + photos[selectedPhoto].key + '.png')} alt={photos[selectedPhoto].alt} />
        <div className="photo-controls"><Button onClick={() => viewPhoto((selectedPhoto + photos.length - 1) % photos.length)}>← Previous</Button><Button variant="outlined" onClick={() => setShowOriginal(!showOriginal)} aria-pressed={showOriginal}>{showOriginal ? 'View enhanced' : 'View original'}</Button><Button onClick={() => viewPhoto((selectedPhoto + 1) % photos.length)}>Next →</Button></div>
        <p className="photo-version" aria-live="polite">{showOriginal ? 'Original supplied image' : 'Enhanced brand image'} · {selectedPhoto + 1} of {photos.length}</p>
      </DialogContent></>}
    </Dialog>
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}><div className="bag"><div className="bag-title"><h2>Your bag</h2><IconButton aria-label="Close bag" onClick={() => setOpen(false)}>×</IconButton></div><Alert severity="info">Demo shopping bag. No payment or real orders.</Alert>
      {done ? <Alert severity="success" sx={{ mt: 2 }}>Demo complete! No order was placed.</Alert> : count === 0 ? <p>Your bag is waiting for something crunchy.</p> : items.filter(p => qty[p.id] > 0).map(p => <div className="bag-item" key={p.id}><h3>{p.name}</h3><div><IconButton aria-label={'Remove one ' + p.name} onClick={() => dispatch(change({ id: p.id, delta: -1 }))}>−</IconButton>{qty[p.id]}<IconButton aria-label={'Add one ' + p.name} onClick={() => dispatch(add(p.id))}>+</IconButton><b>₹{p.price * qty[p.id]}</b></div></div>)}
      {count > 0 && <><h3>Demo total: ₹{items.reduce((s, p) => s + p.price * (qty[p.id] || 0), 0)}</h3><Button fullWidth variant="contained" onClick={() => { dispatch(clear()); setDone(true); }}>Try demo checkout</Button></>}
    </div></Drawer>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><Provider store={store}><ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider></Provider></React.StrictMode>);
