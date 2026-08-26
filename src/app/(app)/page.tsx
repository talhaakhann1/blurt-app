'use client';

import { ArrowRight, Link, Mail, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';



export default function Home() {
  return (
    <div className="min-h-[calc(100vh-69px)] flex flex-col justify-between bg-[#F0F0F0] text-[#121212]">
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8 py-12 md:py-20 max-w-6xl mx-auto w-full">

        <section className="text-center mb-12 max-w-4xl">

          <div className="inline-flex items-center gap-2 border-2 border-black bg-[#F0C020] px-3.5 py-1.5 font-bold uppercase tracking-widest text-xs shadow-[3px_3px_0px_0px_#121212] mb-6">
            <span className="size-2 rounded-full bg-[#D02020] border border-black inline-block" />
            <span>Anonymous Feedback · Raw & Real</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#121212] leading-[1.05]">
            Mail Without <br className="hidden sm:inline" />
            <span className="relative inline-block px-3 py-1 bg-[#D02020] text-white border-4 border-black shadow-[5px_5px_0px_0px_#121212] mt-2">
              A Face.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl font-medium text-[#303030] max-w-2xl mx-auto leading-relaxed">
            Blurt gives you a private, candid channel to collect authentic thoughts, honest feedback, and anonymous questions from your community.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">
                Get Your Link <ArrowRight className="size-5" />
              </Button>
            </Link>
            <Link href="/sign-in" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </section>

        <div className="w-full max-w-xl relative px-2 sm:px-8 my-4">
          <div className="absolute -top-3 left-6 sm:left-12 z-20 bg-[#1040C0] text-white font-black uppercase tracking-wider text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#121212]">
            Recent Anonymous Messages
          </div>
          
          <Carousel
            plugins={[Autoplay({ delay: 3500 })]}
            className="w-full"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-2 sm:p-4">
                  <Card className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#121212]">
                    <CardHeader className="pb-2 pt-6">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-black uppercase text-[#121212]">
                          {message.title}
                        </CardTitle>
                        <div className="size-3 bg-[#D02020] border border-black" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3 bg-[#F0F0F0] border-2 border-black p-4">
                        <Mail className="size-5 text-[#1040C0] shrink-0 mt-0.5" />
                        <p className="text-base font-semibold text-[#121212]">
                          &ldquo;{message.content}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#606060]">
                        <span>Time Received</span>
                        <span className="bg-[#E0E0E0] px-2 py-0.5 border border-black text-[#121212]">
                          {message.received}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-16 sm:mt-20">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#121212]">
            <div className="size-10 rounded-full bg-[#D02020] border-2 border-black flex items-center justify-center mb-4 text-white">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="font-black uppercase text-lg tracking-tight mb-2">100% Anonymous</h3>
            <p className="text-sm font-medium text-[#404040]">
              No cookies, no fingerprinting, no trackers. Complete privacy for honest correspondence.
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#121212]">
            <div className="size-10 rounded-none bg-[#1040C0] border-2 border-black flex items-center justify-center mb-4 text-white">
              <Sparkles className="size-5" />
            </div>
            <h3 className="font-black uppercase text-lg tracking-tight mb-2">AI Suggestions</h3>
            <p className="text-sm font-medium text-[#404040]">
              Stuck on what to ask? Tap our AI prompts to inspire interesting and insightful questions.
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#121212]">
            <div className="size-10 rounded-none bg-[#F0C020] border-2 border-black flex items-center justify-center mb-4 text-[#121212] rotate-6">
              <MessageSquare className="size-5 -rotate-6" />
            </div>
            <h3 className="font-black uppercase text-lg tracking-tight mb-2">Instant Dashboard</h3>
            <p className="text-sm font-medium text-[#404040]">
              Share your link anywhere and monitor your incoming stream in real-time.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-black bg-white py-6 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#121212]">
          <span>© 2026 Blurt. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Form Follows Function</span>
            <span className="size-2 rounded-full bg-[#D02020] inline-block" />
            <span className="size-2 bg-[#1040C0] inline-block" />
            <span className="size-2 bg-[#F0C020] inline-block" />
          </div>
        </div>
      </footer>
    </div>
  )
}
