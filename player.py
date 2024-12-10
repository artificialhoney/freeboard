from __future__ import unicode_literals
import sys
import vlc
from dotenv import dotenv_values

def get_device_type():
    try:
        with open('/proc/device-tree/model') as file:
            content = file.read()

            if 'Raspberry Pi 4' in content:
                return 'pi4'
            elif 'Raspberry Pi 3' in content:
                return 'pi3'
            elif 'Raspberry Pi 2' in content:
                return 'pi2'
            else:
                return 'pi1'
    except FileNotFoundError:
        return 'x86'

class Player:
    def __init__(self, env):
        self.settings = dotenv_values(env)
        options = self.__get_options()
        self.instance = vlc.Instance(options)
        self.player = self.instance.media_player_new()
        self.player.audio_output_set('alsa')

    def get_alsa_audio_device(self):
        if self.settings['audio_output'] == 'local':
            return 'plughw:CARD=Headphones'
        else:
            if get_device_type() == 'pi4':
                return 'default:CARD=vc4hdmi0'
            elif get_device_type() in ['pi1', 'pi2', 'pi3']:
                return 'default:CARD=vc4hdmi'
            else:
                return 'default:CARD=HID'

    def __get_options(self):
        return [
            f'--alsa-audio-device={self.get_alsa_audio_device()}',
        ]

    def play(self):
        self.player.set_mrl(self.settings['url'])
        self.player.audio_output_device_set(
            'alsa', self.get_alsa_audio_device())
        self.player.play()


def main():
    Player(sys.argv[1]).play()

if __name__ == "__main__":
    main()
