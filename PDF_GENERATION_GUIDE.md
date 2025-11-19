# How to Generate PDF Walkthrough

## Option 1: Using VS Code Extensions

1. Install "Markdown PDF" extension in VS Code
2. Open `TECHNICAL_WALKTHROUGH.md`
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "Markdown PDF: Export (pdf)"
5. PDF will be generated in the same directory

## Option 2: Using Online Tools

1. Open https://www.markdowntopdf.com/
2. Upload `TECHNICAL_WALKTHROUGH.md`
3. Click "Convert to PDF"
4. Download the generated PDF

## Option 3: Using Pandoc (Command Line)

```bash
# Install pandoc if not already installed
brew install pandoc  # macOS
# or
sudo apt-get install pandoc  # Ubuntu/Debian

# Generate PDF
pandoc TECHNICAL_WALKTHROUGH.md -o Technical_Walkthrough.pdf --pdf-engine=xelatex
```

## Option 4: Using Chrome/Browser

1. Open `TECHNICAL_WALKTHROUGH.md` in VS Code
2. Use the Markdown Preview feature
3. Right-click in preview and select "Print"
4. Choose "Save as PDF" as the printer
5. Save the PDF

## Recommended Formatting

For best results, ensure the PDF includes:
- Table of contents with links
- Syntax highlighting for code blocks
- Page numbers
- Professional header/footer
- Your name and date on the cover page

## Quick Script (macOS/Linux)

Save this as `generate_pdf.sh` and run it:

```bash
#!/bin/bash
echo "Generating PDF from Technical Walkthrough..."

if command -v pandoc &> /dev/null; then
    pandoc TECHNICAL_WALKTHROUGH.md -o Technical_Walkthrough_Aremu_Moses.pdf \
        --pdf-engine=xelatex \
        --toc \
        --toc-depth=2 \
        -V geometry:margin=1in \
        -V colorlinks=true
    echo "PDF generated successfully!"
else
    echo "Pandoc not installed. Please use VS Code extension or online tool."
fi
```

Then run:
```bash
chmod +x generate_pdf.sh
./generate_pdf.sh
```
