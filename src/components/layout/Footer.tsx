import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const categories = [
  { name: 'রাজনীতি', slug: 'politics' },
  { name: 'খেলাধুলা', slug: 'sports' },
  { name: 'অর্থনীতি', slug: 'economy' },
  { name: 'আন্তর্জাতিক', slug: 'international' },
  { name: 'শিক্ষা', slug: 'education' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background)] text-[var(--foreground)] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">MymensinghPost</h3>
            <p className="text-[var(--card-foreground)] mb-4">
              MymensinghPost হল বাংলাদেশের একটি অগ্রণী অনলাইন নিউজ পোর্টাল, যা সর্বশেষ খবর, ব্রেকিং নিউজ এবং আপডেট প্রদান করে।
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">বিভাগসমূহ</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">দ্রুত লিঙ্ক</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                  যোগাযোগ করুন
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                  গোপনীয়তা নীতি
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors">
                  সেবার শর্তাবলী
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">যোগাযোগ</h3>
            <address className="not-italic text-[var(--foreground)] space-y-2">
              <p>১২৩ নিউজ স্ট্রিট</p>
              <p>ময়মনসিংহ, বাংলাদেশ</p>
              <p>ফোন: +৮৮০১৭১২৩৪৫৬৭৮</p>
              <p>ইমেইল: info@mymensinghpost.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-8 pt-6">
          <p className="text-center text-[var(--muted-foreground)]">
            &copy; {currentYear} MymensinghPost। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;