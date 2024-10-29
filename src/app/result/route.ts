import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const r = req.nextUrl.searchParams.get("r");
  if (r === null) {
    return;
  }
  try {
    const decoded = atob(r);
    const { score, guesses, day } = JSON.parse(decoded);

    //console.log(req.nextUrl.searchParams);
    const link =
      "https://cnvs.b-cdn.net/use/N4IgzglgXgpiBcBtArABlQGgGxoLoZADMIAbGMBRUAOwEMBbOeEACwFdyQCBjAewBMmIADrVRMAB4AXGACc6JAAQBzDmDDlFAXkWJhIAGJHj+jIv0AOAIIAWAMwBhLKfMhrNrAE4rL-b5Fcrvq44tJyCopgfLIw2q4Ayg4A8gBKAKKKWAD0ziLUkjLytEr8tACecfoAjOh+YtRkUpEAjmy0MfHQsTpYqKKNkQAOtNwQ1MoAGnE1-TBNYMOj4wCacQBMffUAAgAisrQA7gCS9LTKMAAUAEYjANbKsrxs1PxmmIqoAJSiu-vHp+drncHk8Xm8zHYvqJZk0DmYWHFdhBGNRILxURdvtQtvE5gZ0VILvpBMNZFI2DEALT0dG8fRYnF4gmdWAXZDIBl7Q7xKSyMbKKzUbgsXgxfhEkAACQAqml4i4Doosoo1hDkG8AHTqj5ahm4qQAGTGMActEG8Va7UuermPMetxgAHUIPwpCwLms9bzeA6AAoxDSyABu1p+BlIJEx0Ox+vx1CkLMuaw5Py5Bzt-MFwtFMHF+gAxPoNRrSmUzIrlarFBYq6gtZqU9i0xnxlmRWKLlEc+WlSqzFUqtq60PdWGI1H6gcIG7FFtfbR+Px+WkJJ3LR0uooANSKTzvfdmGwcxTAUSKc+z-VG-Km83r0PUC+XpnxiUk9rkqk06h0kBYp+MlIcYJl0Fx2I2T4DBUOibE+hCiioahgIoYyIeQGjIaej5PheAxgLcECDHEhDFBoZ44eeECEGh6jaDofggCe5EUU+WTKqo6GVCA-BXDxPF1CxOEcbR9FEIQ4niRYfR5IJT74YRcS8hwzE4QAvipkFzIoEhxLBLHwbIKEoY+qDwFgTHYbJs5pikMDcFItDjGQFwQAAVGA96Jtu2lmGWLRtBusBmB5AUwIm-5WdpcQ6TuCwjPyEwaRe6mWThgEOLwJCihcWx8FlsgXMJYCfBFFFbOGJAkP65ByCGE5Jee6WZdl+boG1UKpQB+p2j6Toum6YGlWlPUOvVnUXlRigAITyURWGRVFMENThBlGahpnmfNC0Xr83K8pmQrtrmOVsIMgxyNwtAaIVSGIBAuCfGYbkhVaXk7jF-mvV0WRVhUsWed9tb1jqyAWENC06ToH1xUskzLU+KWCfDE3UVsJBsKcOV5dlRUlQAfIoVRrBYFnbTt+oZflFyte1HULYjkUwCQGik2Tz5SJTLUSRJ4MsQzVmASNfWuu6VS82VQvVYGdXi2lFWRrL-M4dBih-Z9gWxLFiz8ss0YI6ISuCSAqn4CAV0aFIFBIDQDBCDc3D3I8zz8FwIAUiQCCsFIUiDGA8BsXQbqORATOEOEjmCGAGpXJS3D8NQGr5FIWRgO0tAsFk7DkBqgzjMbpuEPsjBW9QbCVQQMTnbQUgIKX5cgFlvDnS78B1yQBCCCQ5S12XJCqUAA?expires=18446744073709551615&signature=318d353ad2e117a95d8d6a8b64fb9e88";
    const ftdLink = `${link}&guesses=${guesses}&score=${score}&day=${day}`;

    const res = await fetch(ftdLink);
    const blob = await res.arrayBuffer();
    const headers = new Headers();
    headers.set("Content-Type", "image/png");
    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
  } catch {
    return;
  }
}
