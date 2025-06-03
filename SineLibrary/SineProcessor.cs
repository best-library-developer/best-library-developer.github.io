using System;
using System.Numerics;

namespace SineLibrary
{
    /// <summary>
    /// Provides functionality for sine wave signal generation and modulation
    /// </summary>
    public class SineProcessor
    {
        private bool _isGenerating = false;

        /// <summary>
        /// Generates a sine wave signal with the specified parameters
        /// </summary>
        /// <param name="amplitude">Amplitude of the sine wave</param>
        /// <param name="frequency">Frequency in Hz</param>
        /// <param name="phase">Phase in radians</param>
        /// <param name="duration">Duration of the signal in seconds</param>
        /// <param name="sampleRate">Samples per second</param>
        /// <returns>Array of samples representing the sine signal</returns>
        public double[] GenerateSineWave(double amplitude, double frequency, double phase, double duration, int sampleRate)
        {
            _isGenerating = true;
            int numSamples = (int)(duration * sampleRate);
            double[] signal = new double[numSamples];
            int lastSample = 0;

            for (int i = 0; i < numSamples && _isGenerating; i++)
            {
                double t = (double)i / sampleRate;
                signal[i] = amplitude * Math.Sin(2 * Math.PI * frequency * t + phase);
                lastSample = i;
            }

            // If generation was stopped early, return only the generated portion
            if (!_isGenerating && signal.Length > 0)
            {
                Array.Resize(ref signal, Math.Max(1, lastSample + 1));
            }

            _isGenerating = false;
            return signal;
        }

        /// <summary>
        /// Generates an amplitude modulated signal (AM) with the specified parameters
        /// </summary>
        /// <param name="carrierAmplitude">Carrier wave amplitude</param>
        /// <param name="carrierFrequency">Carrier wave frequency in Hz</param>
        /// <param name="messageAmplitude">Message signal amplitude (modulation index)</param>
        /// <param name="messageFrequency">Message signal frequency in Hz</param>
        /// <param name="duration">Duration of the signal in seconds</param>
        /// <param name="sampleRate">Samples per second</param>
        /// <returns>Array of samples representing the AM signal</returns>
        public double[] GenerateAmplitudeModulatedSine(double carrierAmplitude, double carrierFrequency, 
                                                       double messageAmplitude, double messageFrequency,
                                                       double duration, int sampleRate)
        {
            _isGenerating = true;
            int numSamples = (int)(duration * sampleRate);
            double[] signal = new double[numSamples];
            double[] messageSignal = new double[numSamples];
            double[] carrierSignal = new double[numSamples];
            int lastSample = 0;

            for (int i = 0; i < numSamples && _isGenerating; i++)
            {
                // Calculate time at this sample
                double t = (double)i / sampleRate;
                
                // Generate message signal
                messageSignal[i] = messageAmplitude * Math.Sin(2 * Math.PI * messageFrequency * t);
                
                // Generate carrier signal
                carrierSignal[i] = carrierAmplitude * Math.Sin(2 * Math.PI * carrierFrequency * t);
                
                // AM modulation formula: carrier_amplitude * (1 + message_signal) * sin(2π * carrier_freq * t)
                signal[i] = carrierAmplitude * (1 + messageSignal[i]) * Math.Sin(2 * Math.PI * carrierFrequency * t);
                lastSample = i;
            }

            // If generation was stopped early, return only the generated portion
            if (!_isGenerating && signal.Length > 0)
            {
                Array.Resize(ref signal, Math.Max(1, lastSample + 1));
            }
            
            _isGenerating = false;
            return signal;
        }

        /// <summary>
        /// Generates a frequency modulated signal (FM) with the specified parameters
        /// </summary>
        /// <param name="carrierAmplitude">Carrier wave amplitude</param>
        /// <param name="carrierFrequency">Carrier wave frequency in Hz</param>
        /// <param name="modulationIndex">Frequency modulation index (beta)</param>
        /// <param name="messageFrequency">Message signal frequency in Hz</param>
        /// <param name="duration">Duration of the signal in seconds</param>
        /// <param name="sampleRate">Samples per second</param>
        /// <returns>Array of samples representing the FM signal</returns>
        public double[] GenerateFrequencyModulatedSine(double carrierAmplitude, double carrierFrequency,
                                                       double modulationIndex, double messageFrequency,
                                                       double duration, int sampleRate)
        {
            _isGenerating = true;
            int numSamples = (int)(duration * sampleRate);
            double[] signal = new double[numSamples];
            double[] messageSignal = new double[numSamples];
            int lastSample = 0;

            for (int i = 0; i < numSamples && _isGenerating; i++)
            {
                // Calculate time at this sample
                double t = (double)i / sampleRate;
                
                // Generate message signal
                messageSignal[i] = Math.Sin(2 * Math.PI * messageFrequency * t);
                
                // FM modulation formula: A_c * sin(2π * f_c * t + β * m(t))
                signal[i] = carrierAmplitude * Math.Sin(2 * Math.PI * carrierFrequency * t + 
                                                modulationIndex * messageSignal[i]);
                lastSample = i;
            }

            // If generation was stopped early, return only the generated portion
            if (!_isGenerating && signal.Length > 0)
            {
                Array.Resize(ref signal, Math.Max(1, lastSample + 1));
            }
            
            _isGenerating = false;
            return signal;
        }

        /// <summary>
        /// Stops the current signal generation process
        /// </summary>
        public void StopGeneration()
        {
            _isGenerating = false;
        }
        
        /// <summary>
        /// Generates the time array matching a signal of specified duration and sample rate
        /// </summary>
        /// <param name="duration">Signal duration in seconds</param>
        /// <param name="sampleRate">Sample rate in Hz</param>
        /// <returns>Array of time points</returns>
        public double[] GenerateTimeArray(double duration, int sampleRate)
        {
            int numSamples = (int)(duration * sampleRate);
            double[] timeArray = new double[numSamples];
            
            for (int i = 0; i < numSamples; i++)
            {
                timeArray[i] = (double)i / sampleRate;
            }
            
            return timeArray;
        }
    }
}
