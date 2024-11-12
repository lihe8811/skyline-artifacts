'use client';

const GetDomainName = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname;
  }
  return '';
};

export default GetDomainName;