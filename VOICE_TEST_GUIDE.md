# 🎤 Quick Voice Test Guide

## 30-Second Test

### Step 1: Open Calculator
Click the preview button above or navigate to:
```
http://localhost:5000
```

### Step 2: Test Voice Input
1. **Click microphone** 🎤 button
2. **Allow microphone access** when prompted
3. **Say clearly:** "Five plus three"
4. **Watch display** - Should show: `5+3`
5. **Wait for result** - Should show: `8`
6. **Listen** - Should hear: "The answer is 8"

### Step 3: Check Console (Optional)
Press `F12` to open console and verify:
```
🚀 AI Smart Calculator initialized
🎤 Voice input initialized
Voice recognition started
Heard: five plus three
Converted to: 5+3
Sending expression: 5+3
Response status: 200
Response data: {result: '8', success: true}
```

---

## ✅ Success Checklist

After saying "five plus three", you should see:

- [ ] Display shows: `5+3`
- [ ] Result appears: `8`
- [ ] Console shows: "Heard: five plus three"
- [ ] Console shows: "Converted to: 5+3"
- [ ] Flask terminal shows: "🔊 Spoke: 'The answer is 8'"
- [ ] You hear voice say: "The answer is 8"

**If all checked:** ✅ VOICE WORKING PERFECTLY!

---

## 🐛 Troubleshooting

### No microphone icon?
- Refresh page (Ctrl+R or F5)
- Check if JavaScript loaded (F12 → Console)

### "Web Speech API not supported"?
- Use Chrome or Edge browser
- Firefox has limited support

### No voice heard?
1. Check system volume
2. Verify speakers/headphones working
3. Check Flask terminal for: "🔊 Spoke: ..."

### "Microphone permission denied"?
- Click address bar → Site settings → Permissions → Microphone → Allow

---

## 🎯 More Voice Tests

Try these commands:

| Say | Expected Result |
|-----|-----------------|
| "Ten divided by two" | 5 |
| "Seven times eight" | 56 |
| "Twenty minus fifteen" | 5 |
| "Two to the power of three" | 8 |

---

**If everything works:** Your voice system is fully functional! 🎉
