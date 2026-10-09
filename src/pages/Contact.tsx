import { Credits } from '../components/Footer'
import { Reveal, RevealLines } from '../components/Reveal'
import { asset } from '../data/assets'
import { site } from '../data/site'
import { useSeo } from '../hooks/useSeo'

export default function Contact() {
  useSeo('Get in touch', 'Call 323 739 0372 or email hello@friendlyfilmworks.com to start a project with Friendly Entertainment.')
  const big = 'display line-link text-[clamp(24px,2.6vw,44px)] text-white'
  return (
    <section className="relative flex min-h-[100svh] flex-col">
      {/* Anchored right so the Hollywood sign stays in frame on narrow screens. */}
      <img src={asset('images/contact-los-angeles.webp')} alt="The Hollywood sign above the Los Angeles hills, in black and white" className="absolute inset-0 h-full w-full object-cover object-[72%_50%]" />
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div className="gutter relative flex flex-1 flex-col justify-between pb-5 pt-32 sm:pt-40">
        <div>
          <p className="label text-lg text-white sm:text-xl">Get in touch</p>
          <RevealLines as="h1" immediate className="display mt-4 text-[clamp(56px,12.4vw,230px)] text-white" lines={['Let us tell', 'your story.']} />
        </div>

        <div>
          <Reveal className="grid gap-10 pb-14 pt-16 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="meta !text-soft">Call us</h2>
              <a href={site.phoneHref} className={`${big} mt-2`}>{site.phoneDisplay}</a>
            </div>
            <div>
              <h2 className="meta !text-soft">Email us</h2>
              <a href={site.emailHref} className={`${big} mt-2`}>{site.email}</a>
            </div>
            <div>
              <h2 className="meta !text-soft">Connect with us</h2>
              <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                {[['Instagram', site.instagram], ['Vimeo', site.vimeo], ['LinkedIn', site.linkedin]].map(([label, href]) => (
                  <li key={label}><a href={href} target="_blank" rel="noreferrer" className={big}>{label}</a></li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Credits className="!text-[#b5b5b5]" />
        </div>
      </div>
    </section>
  )
}
