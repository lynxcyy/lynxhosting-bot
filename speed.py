import subprocess
import json

def run_speedtest():
    result = subprocess.run(['/home/container/speedtest', '--accept-license', '--format=json'], capture_output=True, text=True)
    if result.returncode == 0:
        data = json.loads(result.stdout)
        download_speed = data['download']['bandwidth'] * 8 / 1_000_000  # Convert to Mbps
        upload_speed = data['upload']['bandwidth'] * 8 / 1_000_000  # Convert to Mbps
        ping = data['ping']['latency']
        print("Speedtest VPS ELL:")
        print("-" * 70)
        print(f"Download Speed: {download_speed:.2f} Mbps")
        print(f"Upload Speed: {upload_speed:.2f} Mbps")
        print(f"Ping: {ping:.2f} ms")
        print("-" * 70)
    else:
        print("Speedtest failed:", result.stderr)

if __name__ == "__main__":
    run_speedtest()