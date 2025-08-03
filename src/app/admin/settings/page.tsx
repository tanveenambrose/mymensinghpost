'use client';

import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'MymensinghPost',
    siteDescription: 'ময়মনসিংহের সর্বাধিক পঠিত অনলাইন নিউজ পোর্টাল',
    siteEmail: 'info@mymensinghpost.com',
    sitePhone: '+880 1712-345678',
    siteAddress: 'ময়মনসিংহ, বাংলাদেশ',
  });

  const [socialSettings, setSocialSettings] = useState({
    facebook: 'https://facebook.com/mymensinghpost',
    twitter: 'https://twitter.com/mymensinghpost',
    instagram: 'https://instagram.com/mymensinghpost',
    youtube: 'https://youtube.com/mymensinghpost',
  });

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'MymensinghPost - ময়মনসিংহের সর্বাধিক পঠিত অনলাইন নিউজ পোর্টাল',
    metaDescription: 'ময়মনসিংহের সর্বাধিক পঠিত অনলাইন নিউজ পোর্টাল। রাজনীতি, খেলাধুলা, অর্থনীতি, আন্তর্জাতিক, শিক্ষা, বিনোদন, প্রযুক্তি, স্বাস্থ্য সহ সকল খবর পড়ুন।',
    metaKeywords: 'ময়মনসিংহ, নিউজ, খবর, বাংলাদেশ, রাজনীতি, খেলাধুলা, অর্থনীতি',
    googleAnalyticsId: 'UA-123456789-1',
  });

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialSettings({
      ...socialSettings,
      [name]: value,
    });
  };

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeoSettings({
      ...seoSettings,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would submit the settings to an API
      // For this demo, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('সেটিংস সফলভাবে আপডেট করা হয়েছে');
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('সেটিংস আপডেট করতে সমস্যা হয়েছে');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">সাইট সেটিংস</h1>

      <form onSubmit={handleSubmit}>
        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">সাধারণ সেটিংস</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                সাইটের নাম
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={generalSettings.siteName}
                onChange={handleGeneralChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                সাইটের বিবরণ
              </label>
              <input
                type="text"
                id="siteDescription"
                name="siteDescription"
                value={generalSettings.siteDescription}
                onChange={handleGeneralChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="siteEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ইমেইল
              </label>
              <input
                type="email"
                id="siteEmail"
                name="siteEmail"
                value={generalSettings.siteEmail}
                onChange={handleGeneralChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="sitePhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ফোন
              </label>
              <input
                type="text"
                id="sitePhone"
                name="sitePhone"
                value={generalSettings.sitePhone}
                onChange={handleGeneralChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="siteAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ঠিকানা
              </label>
              <input
                type="text"
                id="siteAddress"
                name="siteAddress"
                value={generalSettings.siteAddress}
                onChange={handleGeneralChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Media Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">সোশ্যাল মিডিয়া সেটিংস</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ফেসবুক
              </label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                value={socialSettings.facebook}
                onChange={handleSocialChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                টুইটার
              </label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={socialSettings.twitter}
                onChange={handleSocialChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ইনস্টাগ্রাম
              </label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={socialSettings.instagram}
                onChange={handleSocialChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ইউটিউব
              </label>
              <input
                type="url"
                id="youtube"
                name="youtube"
                value={socialSettings.youtube}
                onChange={handleSocialChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">SEO সেটিংস</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                মেটা টাইটেল
              </label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                value={seoSettings.metaTitle}
                onChange={handleSeoChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                মেটা বিবরণ
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                value={seoSettings.metaDescription}
                onChange={handleSeoChange}
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                মেটা কীওয়ার্ড (কমা দিয়ে আলাদা করুন)
              </label>
              <input
                type="text"
                id="metaKeywords"
                name="metaKeywords"
                value={seoSettings.metaKeywords}
                onChange={handleSeoChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="googleAnalyticsId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Google Analytics ID
              </label>
              <input
                type="text"
                id="googleAnalyticsId"
                name="googleAnalyticsId"
                value={seoSettings.googleAnalyticsId}
                onChange={handleSeoChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-6 py-2 rounded-md flex items-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave className="mr-2" />
            {isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
}