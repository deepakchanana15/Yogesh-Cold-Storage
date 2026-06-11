export default function SchemaMarkup() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'WarehouseOrStorageFacility'],
    name: 'Yogesh Cold Storage',
    description:
      'Professional cold storage and warehousing facility in Gannaur, Sonipat, Haryana offering 2,412 MT temperature-controlled storage for agricultural produce and commercial commodities.',
    url: 'https://yogeshcoldstorage.com',
    telephone: '+91-8287282830',
    email: 'yogeshcoldstorage@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gannaur',
      addressLocality: 'Gannaur',
      addressRegion: 'Haryana',
      postalCode: '131101',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '29.0088',
      longitude: '77.0024',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Bank Transfer, UPI',
    areaServed: [
      { '@type': 'State', name: 'Haryana' },
      { '@type': 'City', name: 'Sonipat' },
      { '@type': 'City', name: 'Gannaur' },
    ],
    hasMap: 'https://maps.google.com/?q=Gannaur+Sonipat+Haryana',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '25',
    },
    knowsAbout: [
      'Cold Storage',
      'Potato Storage',
      'Apple Storage',
      'Agricultural Storage',
      'Warehousing',
      'Temperature Controlled Storage',
    ],
    founder: {
      '@type': 'Person',
      name: 'Sudha Jain',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the total storage capacity of Yogesh Cold Storage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yogesh Cold Storage has a total capacity of 2,412 MT across 3 chambers, with space for 48,240 bags of 50kg each.',
        },
      },
      {
        '@type': 'Question',
        name: 'What temperature is maintained in the cold storage chambers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All chambers maintain a temperature of 2°C to 4°C with humidity levels between 90% and 95%, ideal for potato, apple, and agricultural produce storage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Yogesh Cold Storage located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yogesh Cold Storage is located in Gannaur, Sonipat, Haryana, India — strategically positioned near major agricultural markets in the Delhi-NCR region.',
        },
      },
      {
        '@type': 'Question',
        name: 'What commodities can be stored at Yogesh Cold Storage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We primarily specialize in potato and apple storage. Storage for other approved agricultural produce and commercial commodities is available based on customer requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the daily loading capacity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yogesh Cold Storage has a maximum daily loading capacity of 96 MT per day across all three chambers combined.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I check storage availability?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can check storage availability by calling us at +91 94167 94784, sending a WhatsApp message, or filling out the inquiry form on our website.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
