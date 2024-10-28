"use client"; // Ensure this is a client component

import React from 'react';
import Link from 'next/link';
import { X as XIcon } from 'lucide-react'; // Import X icon
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <Card className="bg-gray-900 text-white shadow-lg border border-gray-800 max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <XIcon className="text-red-500 w-8 h-8" />
          </div>
          <CardTitle className="text-3xl text-center">Page Not Found</CardTitle>
          <CardDescription className="text-center text-gray-400 mt-2 text-xl">
            Sorry, the page you&apos;re looking for doesn&apos;t exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-y-4">
          <p className="text-gray-400 text-center text-lg">
            The page might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/" className='w-full'>
              Go back to the home page
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage