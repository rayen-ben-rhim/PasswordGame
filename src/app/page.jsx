"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

export default function Component() {
  const [password, setPassword] = useState("");
  const [currentRule, setCurrentRule] = useState(1);
  const [digitSum, setDigitSum] = useState(0);

  useEffect(() => {
    const sum = password
      .split("")
      .filter((char) => /\d/.test(char))
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    setDigitSum(sum);
  }, [password]);

  const rules = [
    { id: 1, text: "Your password must be at least 5 characters.", check: (pass) => pass.length >= 5 },
    { id: 2, text: "Your password must include a number.", check: (pass) => /\d/.test(pass) },
    { id: 3, text: "Your password must include an uppercase letter.", check: (pass) => /[A-Z]/.test(pass) },
    { id: 4, text: "Your password must include a special character.", check: (pass) => /[^A-Za-z0-9]/.test(pass) },
    { id: 5, text: "The digits in your password must add up to 25.", check: (pass) => digitSum === 25 },
    { id: 6, text: "Your password must include a month of the year.", check: (pass) => /(January|February|March|April|May|June|July|August|September|October|November|December)/i.test(pass) },
    { id: 7, text: "Your password must include a roman numeral.", check: (pass) => /(I|V|X|L|C|D|M)/i.test(pass) },
    { id: 8, text: "Your password must include one of our sponsors.", check: (pass) => /sponsor1|sponsor2|sponsor3/i.test(pass) }, // Replace with actual sponsors
    { id: 9, text: "The roman numerals in your password should multiply to 35.", check: (pass) => /(V|XXX)/.test(pass) }, // Example check for roman numerals
    { id: 10, text: "Your password must include this CAPTCHA:", check: (pass) => /CAPTCHA/i.test(pass) }, // Replace with actual CAPTCHA
    { id: 11, text: "Your password must include today's Wordle answer.", check: (pass) => /wordle/i.test(pass) }, // Replace with today's Wordle answer
    { id: 12, text: "Your password must include a two letter symbol from the periodic table.", check: (pass) => /(He|Li|Na|K|Ar|Ca)/i.test(pass) }, // Example periodic table symbols
    { id: 13, text: "Your password must include the current phase of the moon as an emoji.", check: (pass) => /🌑|🌒|🌓|🌔|🌕|🌖|🌗|🌘/.test(pass) },
    { id: 14, text: "Your password must include the name of this country.", check: (pass) => /USA|Canada|Mexico|France|Germany|Italy/i.test(pass) }, // Tracking real countries
    { id: 15, text: "Your password must include a leap year.", check: (pass) => /2020|2024|2028|2032/.test(pass) }, // Example leap years
    { id: 16, text: "Your password must include the best move in algebraic chess notation.", check: (pass) => /Nf3|e4|d4|c4/i.test(pass) }, // Example best moves
    { id: 17, text: "🥚 ← This is my chicken Paul. He hasn't hatched yet, please put him in your password and keep him safe.", check: (pass) => pass.includes("🥚") },
    { id: 18, text: "The elements in your password must have atomic numbers that add up to 200.", check: (pass) => /(H|He|Li|Be|B|C|N|O|F|Ne)/.test(pass) }, // Example check for atomic numbers
 // HTML check for bold vowels

    { id: 21, text: "Your password is not strong enough 🏋️‍♂️", check: (pass) => /🏋️‍♂️🏋️‍♂️🏋️‍♂️/.test(pass) }, // Example check for strength
    { id: 22, text: "Your password must contain one of the following affirmations.", check: (pass) => /(yes|no|maybe)/i.test(pass) },
    { id: 23, text: "Paul has hatched! Please don't forget to feed him, he eats three 🐛 every minute.", check: (pass) => pass.includes("🐛") },
    { id: 24, text: "Your password must include the URL of a xx minute yy second long YouTube video.", check: (pass) => /(https?:\/\/\S+\.youtube\.com\S+)/.test(pass) }, // Example YouTube URL
    { id: 25, text: "A sacrifice must be made. Pick 2 letters that you will no longer be able to use.", check: (pass) => pass.length > 2 }, // Example check
    { id: 26, text: "Your password must contain twice as many italic characters as bold.", check: (pass) => /(i)/.test(pass) && /(b)/.test(pass) }, // Example check
    { id: 27, text: "At least 30% of your password must be in the Wingdings font.", check: (pass) => /[✈️✉️🎆🎈🎉]/.test(pass) }, // Example check for Wingdings
    { id: 28, text: "Your password must include this color in hex.", check: (pass) => /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/.test(pass) },
    { id: 29, text: "All roman numerals must be in Times New Roman.", check: (pass) => /<span style="font-family: 'Times New Roman';">/.test(pass) }, // Example check for font
    { id: 30, text: "The font size of every digit must be equal to its square.", check: (pass) => /<span style="font-size:\d+px;">\d+<\/span>/.test(pass) }, // Example check for font size
    { id: 31, text: "Every instance of the same letter must have a different font size.", check: (pass) => /(font-size:\d+px;)/.test(pass) }, // Example check
  ];

  useEffect(() => {
    for (let i = 0; i < rules.length; i++) {
      if (!rules[i].check(password)) {
        setCurrentRule(rules[i].id);
        break;
      }
      if (i === rules.length - 1 && rules[i].check(password)) {
        setCurrentRule(rules.length + 1);
      }
    }
  }, [password, digitSum, rules]);

  const completeRules = rules.filter((rule) => rule.id < currentRule);
  const incompleteRules = rules.filter((rule) => rule.id === currentRule);
  const hiddenRules = rules.filter((rule) => rule.id > currentRule);

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 bg-[#fdf6e3]">
      <h1 className="text-4xl mb-16 font-serif">
        <span className="mr-2">*</span>The Password Game
      </h1>

      <div className="w-full max-w-[600px] px-4">
        <p className="text-2xl mb-4 font-serif">Please choose a password</p>

        <div className="relative mb-8">
          <textarea
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 text-2xl rounded-xl border-2 border-black pr-16"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">
            {password.length}
          </span>
        </div>

        <div className="space-y-4 overflow-auto">
          {incompleteRules.map((rule) => (
            <div
            key={rule.id}
            className="p-6 rounded-xl border-2 bg-red-100 border-red-200 opacity-100 transition-opacity duration-500"
          >
            <div className="flex items-center gap-3">
              <X className="w-6 h-6 text-red-600" />
              <span className="text-xl font-serif">Rule {rule.id}</span>
            </div>
            <p className="text-xl mt-2 font-serif">{rule.text}</p>
          </div>
          ))}
          {completeRules.map((rule) => (
            <div
            key={rule.id}
            className="p-6 rounded-xl border-2 bg-green-100 border-green-200 opacity-100 transition-opacity duration-500"
          >
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-600" />
              <span className="text-xl font-serif">Rule {rule.id}</span>
            </div>
            <p className="text-xl mt-2 font-serif">{rule.text}</p>
          </div>
          ))}
          {hiddenRules.map((rule) => (
            <div
            key={rule.id}
            className="p-6 rounded-xl border-2 bg-white border-gray-200 opacity-50 transition-opacity duration-500 hidden"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl font-serif">Rule {rule.id}</span>
            </div>
            <p className="text-xl mt-2 font-serif">{rule.text}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
