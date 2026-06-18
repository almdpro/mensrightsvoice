import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { crimeType, victimName, phoneNumber, description, attachments } = data;

    if (!description || description.trim() === "") {
      return NextResponse.json(
        { error: "Description of the incident is required." },
        { status: 400 }
      );
    }

    const referenceId = "MRB-CR-" + Math.floor(100000 + Math.random() * 900000);
    const recipientEmail = "assad2024@yandex.com";

    // System Log for verification and traceability
    console.log("------------------- SECURE REPORT SYSTEM REPORT RECEIVED -------------------");
    console.log(`SECURE RECIPIENT: ${recipientEmail}`);
    console.log(`Reference ID: ${referenceId}`);
    console.log(`Crime Type: ${crimeType}`);
    console.log(`Victim Name: ${victimName || "Anonymous / Not Specified"}`);
    console.log(`Phone Number: ${phoneNumber || "Not Specified"}`);
    console.log(`Description:\n${description}`);
    console.log(`Attachments Received: ${attachments ? attachments.length : 0} items`);
    if (attachments && attachments.length > 0) {
      attachments.forEach((file: any, index: number) => {
        console.log(`  [Attachment #${index + 1}] Name: ${file.name}, Type: ${file.type}, Format: ${file.format || "Generic"}, Data Size: ${file.data ? file.data.substring(0, 50) + "..." : "Attached"}`);
      });
    }
    console.log("-------------------------------------------------------------------------");

    let dispatchedToExternal = false;

    // 1. FORMSPREE INTEGRATION (Preferred third-party secure pipeline)
    const formspreeFormId = process.env.FORMSPREE_FORM_ID;
    if (formspreeFormId) {
      try {
        console.log(`Attempting secure server-to-server Formspree dispatch for form ID: ${formspreeFormId}`);
        const fRes = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            subject: `[MRB INCIDENT SECURE REPORT] #${referenceId} - ${crimeType}`,
            referenceId,
            crimeType,
            victimName: victimName || "Anonymous / Not Specified",
            phoneNumber: phoneNumber || "Not Specified",
            description,
            attachmentsSummary: attachments && attachments.length > 0 
              ? attachments.map((a: any) => `${a.name} (${a.size})`).join(", ")
              : "No attachments",
            _replyto: recipientEmail,
          })
        });

        if (fRes.ok) {
          dispatchedToExternal = true;
          console.log("Formspree dispatch completed successfully.");
        } else {
          console.error("Formspree dispatch responded with error status:", fRes.status);
        }
      } catch (fErr) {
        console.error("Formspree secure routing pipe crash:", fErr);
      }
    }

    // 2. EMAILJS REST API INTEGRATION (Alternative secure pipeline)
    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
    const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!dispatchedToExternal && emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
      try {
        console.log("Attempting secure server-to-server EmailJS dispatch...");
        const eRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            service_id: emailjsServiceId,
            template_id: emailjsTemplateId,
            user_id: emailjsPublicKey,
            accessToken: emailjsPrivateKey || undefined,
            template_params: {
              subject: `[MRB INCIDENT SECURE REPORT] #${referenceId} - ${crimeType}`,
              reference_id: referenceId,
              crime_type: crimeType,
              victim_name: victimName || "Anonymous / Not Specified",
              phone_number: phoneNumber || "Not Specified",
              description: description,
              attachments_summary: attachments && attachments.length > 0 
                ? attachments.map((a: any) => `${a.name} (${a.size})`).join(", ")
                : "No files attached",
              recipient_email: recipientEmail
            }
          })
        });

        if (eRes.ok) {
          dispatchedToExternal = true;
          console.log("EmailJS dispatch completed successfully.");
        } else {
          console.error("EmailJS dispatch responded with error status:", eRes.status);
        }
      } catch (eErr) {
        console.error("EmailJS secure routing pipe crash:", eErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Report securely processed and routed to administrative office.",
      referenceId,
      dispatchedExternally: dispatchedToExternal
    });
  } catch (error: any) {
    console.error("Secure Report API Error:", error);
    return NextResponse.json(
      { error: "Internal server error during report routing." },
      { status: 500 }
    );
  }
}
